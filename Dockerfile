FROM node:22-alpine AS base
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
RUN apk add --no-cache libc6-compat openssl ca-certificates

FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci

FROM base AS builder
ENV NODE_ENV=production
ENV CI=1
ENV DATABASE_URL="postgresql://zagz:zagz_secret@db:5432/zagz?schema=public"

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN chmod -R u+w /app

RUN npx prisma generate

RUN mkdir -p .next/cache && chmod -R 777 .next

RUN npm run build

# Отдельный образ для миграций (полный prisma CLI)
FROM builder AS migrate

FROM base AS runner
ENV NODE_ENV=production

RUN addgroup -g 1001 -S nodejs \
  && adduser -S -u 1001 -G nodejs nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
