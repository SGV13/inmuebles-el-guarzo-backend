/**
 * pinoLoggerConfig — Configuración de Pino según el entorno.
 *
 * En desarrollo: logs formateados con pino-pretty (legibles en consola).
 * En producción: logs enviados a BetterStack via @logtail/pino transport.
 *
 * → CAPA: Infrastructure (Uncle Bob)
 */

import { Params } from 'nestjs-pino';

const isDevelopment = process.env.NODE_ENV !== 'production';

const devTransport = {
  target: 'pino-pretty',
  options: {
    colorize: true,
    singleLine: true,
    translateTime: 'SYS:standard',
    ignore: 'pid,hostname',
  },
} as const;

const prodTransport = {
  target: '@logtail/pino',
  options: {
    sourceToken: process.env.BETTERSTACK_SOURCE_TOKEN ?? '',
  },
} as const;

const resolveTransport = (): { target: string; options: Record<string, unknown> } | undefined => {
  if (isDevelopment) return devTransport;
  if (process.env.BETTERSTACK_SOURCE_TOKEN) return prodTransport;
  return undefined;
};

export const pinoLoggerConfig: Params = {
  pinoHttp: {
    level: isDevelopment ? 'debug' : 'info',
    transport: resolveTransport(),
    customProps: () => ({
      environment: process.env.NODE_ENV ?? 'development',
    }),
    redact: {
      paths: [
        'req.headers.authorization',
        'req.headers.cookie',
        'req.body.password',
        'req.body.token',
      ],
      remove: true,
    },
    serializers: {
      req: (req: { method: string; url: string; id: string }) => ({
        id: req.id,
        method: req.method,
        url: req.url,
      }),
      res: (res: { statusCode: number }) => ({
        statusCode: res.statusCode,
      }),
    },
  },
};
