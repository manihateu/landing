# Никита & Полина — Свадебное приглашение

Свадебный сайт-приглашение на Next.js с формой RSVP и админ-панелью для просмотра гостей.

## Запуск (Docker)

```bash
echo "GUEST_PAGE_PASSWORD=ваш_пароль" > .env
docker compose build --no-cache app
docker compose up -d
```

При старте сначала запускается сервис `migrate` (создаёт таблицы в PostgreSQL), затем `app`.

> **Windows:** если сборка падает с `EPERM`, убедитесь что Docker Desktop запущен, и проект лежит в WSL/Linux-диске (не на `C:\` через `/mnt/c`). Также попробуйте: `docker compose build --no-cache app`.

Сайт: [http://localhost:11435](http://localhost:11435) (порт настроен в `docker-compose.yml`)

## Запуск (локально)

```bash
yarn install
cp .env.example .env
# Настройте DATABASE_URL и GUEST_PAGE_PASSWORD в .env
yarn prisma db push
yarn dev
```

Сайт: [http://localhost:3000](http://localhost:3000)  
Список гостей: [http://localhost:3000/guest](http://localhost:3000/guest)

## Переменные окружения

| Переменная | Описание |
|---|---|
| `DATABASE_URL` | Строка подключения PostgreSQL |
| `GUEST_PAGE_PASSWORD` | Пароль для страницы `/guest` |

## Что настроить

- **Музыка** — замените URL в `src/components/MusicPlayer.tsx`
- **Детские фото** — замените изображения в `src/components/ChildhoodPhotos.tsx`
- **Текст истории** — отредактируйте `STORY_TEXT` в `src/lib/constants.ts`
- **Telegram** — укажите ссылки в `TELEGRAM_LINKS` в `src/lib/constants.ts`
- **Тайминг** — измените `TIMELINE` в `src/lib/constants.ts`

## API

- `POST /api/rsvp` — сохранение анкеты гостя
- `GET /api/guests` — список гостей (заголовок `x-guest-password`)

## Деплой на сервер (polinaandnikita.ru)

### 1. Docker

```bash
docker compose up -d --build
# приложение доступно только на 127.0.0.1:11435
```

### 2. Nginx

```bash
sudo mkdir -p /var/www/certbot
sudo cp nginx/polinaandnikita.ru.conf /etc/nginx/sites-available/polinaandnikita.ru
sudo ln -sf /etc/nginx/sites-available/polinaandnikita.ru /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
```

### 3. SSL (certbot)

```bash
sudo certbot --nginx -d polinaandnikita.ru -d www.polinaandnikita.ru
```

Certbot сам добавит HTTPS-блок и редирект с HTTP на HTTPS.
