/**
 * pinoLoggerConfig — Configuración de Pino según el entorno.
 *
 * En desarrollo: logs formateados con pino-pretty (legibles en consola).
 * En producción: logs en JSON puro (procesables por BetterStack).
 *
 * Campos adicionales en cada log:
 *   - environment: dev | stg | prd
 *   - version: versión del package.json
 *
 * → CAPA: Infrastructure (Uncle Bob)
 */

import { Params } from 'nestjs-pino';

const isDevelopment = process.env.NODE_ENV !== 'production';

export const pinoLoggerConfig: Params = {
  pinoHttp: {
    level: isDevelopment ? 'debug' : 'info',
    transport: isDevelopment
      ? {
          target: 'pino-pretty',
          options: {
            colorize: true,
            singleLine: true,
            translateTime: 'SYS:standard',
            ignore: 'pid,hostname',
          },
        }
      : undefined,
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
