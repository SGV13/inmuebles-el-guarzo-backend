/**
 * instrument.ts — Inicialización de Sentry.
 *
 * DEBE importarse antes que cualquier otro módulo en main.ts.
 * Sentry necesita instrumentar el runtime antes de que NestJS
 * registre sus propios handlers.
 *
 * Decisiones:
 *   - sendDefaultPii: false — no enviamos datos personales a Sentry
 *     por cumplimiento con Ley 1581/2012 (CFM-C01).
 *   - tracesSampleRate: 0.1 en producción — capturamos el 10% de
 *     transacciones para performance monitoring sin agotar la cuota
 *     del plan gratuito (10k trazas/mes).
 *   - En desarrollo: tracesSampleRate 1.0 para ver to do.
 *
 * → CAPA: Frameworks & Drivers (Uncle Bob)
 */

import * as Sentry from '@sentry/nestjs';

const isDevelopment = process.env.NODE_ENV !== 'production';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV ?? 'development',
  sendDefaultPii: false,
  tracesSampleRate: isDevelopment ? 1 : 0.1,
  enabled: !!process.env.SENTRY_DSN,
});
