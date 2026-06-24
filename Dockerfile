FROM node:22-bookworm-slim AS base
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1 \
    DEBIAN_FRONTEND=noninteractive

# Зеркало + повторы: на части VPS CDN Alpine/Debian недоступен (TLS errors)
RUN set -eux; \
    if [ -f /etc/apt/sources.list.d/debian.sources ]; then \
      sed -i \
        -e 's|http://deb.debian.org/debian|http://mirror.yandex.ru/debian|g' \
        -e 's|http://deb.debian.org/debian-security|http://mirror.yandex.ru/debian-security|g' \
        /etc/apt/sources.list.d/debian.sources; \
    elif [ -f /etc/apt/sources.list ]; then \
      sed -i \
        -e 's|http://deb.debian.org/debian|http://mirror.yandex.ru/debian|g' \
        -e 's|http://security.debian.org/debian-security|http://mirror.yandex.ru/debian-security|g' \
        /etc/apt/sources.list; \
    fi; \
    for attempt in 1 2 3; do \
      apt-get update && \
      apt-get install -y --no-install-recommends openssl ca-certificates && \
      break; \
      echo "apt retry ${attempt}..."; \
      sleep 5; \
    done; \
    rm -rf /var/lib/apt/lists/*; \
    corepack enable; \
    corepack prepare yarn@1.22.22 --activate

FROM base AS deps
COPY package.json yarn.lock .yarnrc ./
RUN yarn install --frozen-lockfile

FROM base AS builder
ARG NEXT_SERVER_ACTIONS_ENCRYPTION_KEY
ENV NODE_ENV=production
ENV CI=1
ENV DATABASE_URL="postgresql://zagz:zagz_secret@db:5432/zagz?schema=public"
ENV NEXT_SERVER_ACTIONS_ENCRYPTION_KEY=${NEXT_SERVER_ACTIONS_ENCRYPTION_KEY}

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN yarn prisma generate
RUN yarn build

FROM base AS migrate
COPY --from=deps /app/node_modules ./node_modules
COPY package.json yarn.lock .yarnrc ./
COPY prisma ./prisma
CMD ["yarn", "prisma", "db", "push", "--skip-generate"]

FROM base AS runner
ENV NODE_ENV=production

RUN groupadd --system --gid 1001 nodejs \
  && useradd --system --uid 1001 --gid nodejs nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
