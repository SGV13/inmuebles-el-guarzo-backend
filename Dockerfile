# ─── Stage 1: build ───────────────────────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# Instalar pnpm
RUN npm install -g pnpm

# Copiar manifiestos primero para aprovechar cache de Docker
COPY package.json pnpm-lock.yaml ./
COPY prisma ./prisma

# Instalar todas las dependencias (incluyendo devDependencies para build)
RUN pnpm install --frozen-lockfile

# Generar cliente Prisma
RUN pnpm prisma generate

# Copiar el resto del código y compilar
COPY . .
RUN pnpm build

# ─── Stage 2: production ──────────────────────────────────────────────────────
FROM node:20-alpine AS production

WORKDIR /app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./
COPY prisma ./prisma

# Solo dependencias de producción
RUN pnpm install --frozen-lockfile --prod

# Generar cliente Prisma en la imagen de producción
RUN pnpm prisma generate

# Copiar el build compilado desde el stage anterior
COPY --from=builder /app/dist ./dist

ENV NODE_ENV=production

EXPOSE 3000

CMD ["node", "dist/main"]
