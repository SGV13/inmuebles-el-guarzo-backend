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

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./
COPY prisma ./prisma

ENV NODE_ENV=production

RUN pnpm install --frozen-lockfile --prod


# Copiar node_modules completo del builder que ya tiene Prisma generado
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma

COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/main"]
