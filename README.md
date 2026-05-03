# Inmuebles El Guarzo — Backend v2

Backend de la plataforma inmobiliaria Inmuebles El Guarzo, segunda versión.

## Stack

- NestJS 10 + TypeScript 5 (strict mode)
- PostgreSQL 16 (Neon) + Prisma 5
- Supabase Auth como Identity Provider
- Cloudflare WAF/CDN + Kong Gateway
- Resend (correos) + Upstash Redis (caché)
- Doppler (secrets) + GitHub Actions (CI/CD) + SonarCloud

## Arquitectura

Monolito modular con Clean Architecture (Uncle Bob) por bounded context.
Bounded contexts: `iam`, `properties`, `offers`, `contacts`, `publications`,
`notifications`, `audit`, `configuration`.

Decisiones documentadas en `docs/adr/`.

## Requisitos previos

- Node 20.18.0 LTS (vía nvm-windows)
- pnpm 9+
- Docker Desktop
- Doppler CLI

## Setup local

```bash
nvm use 20.18.0
pnpm install
cp .env.example .env
# completar .env con valores reales
docker compose up -d
pnpm prisma migrate dev
pnpm start:dev
```

## Estrategia de ramificación

GitHub Flow con dos ambientes:

- `main` → producción (deploy automático tras merge)
- `develop` → staging (deploy automático tras merge)
- `feature/*`, `fix/*`, `chore/*`, `docs/*`, `refactor/*`, `test/*` → ramas cortas

Toda PR requiere aprobación de un compañero del equipo y checks de CI verdes.

## Convenciones

- Conventional Commits para mensajes de commit (`feat:`, `fix:`, `chore:`...)
- Funciones máximo 50 líneas, archivos máximo 300 líneas
- Tipado estricto, sin `any`
- Nombres de variables y funciones en inglés
- Comentarios de lógica de negocio en español
- Cobertura mínima 70% global, 90% en capa de dominio

Cambio trivial de prueba pruebosa

## Equipo

- Samuel Giraldo Villada
- Juan Camilo Urrea Garcia
