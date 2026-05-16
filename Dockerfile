# ─── Stage 1: build ───────────────────────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./
COPY prisma ./prisma

RUN pnpm install --frozen-lockfile

RUN pnpm prisma generate

COPY . .
RUN pnpm build

# ─── Stage 2: production ──────────────────────────────────────────────────────
FROM node:20-alpine AS production

WORKDIR /app

# OpenSSL requerido por el query engine de Prisma en Alpine
RUN apk add --no-cache openssl


RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./
COPY prisma ./prisma

ENV NODE_ENV=production

RUN pnpm install --frozen-lockfile --prod

RUN pnpm prisma generate

COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/main"]
