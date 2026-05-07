/**
 * validateEnv — Funcion que NestJS ConfigModule invoca al bootstrap
 * con el objeto plano de variables de entorno. Si la validacion
 * falla, lanza una excepcion que detiene el arranque y muestra
 * TODOS los errores en una sola pasada (no falla en el primero).
 *
 * Decision: reportar todos los errores juntos para que el dev pueda
 * corregir multiples problemas en un solo intento, en vez de fixear
 * uno, reiniciar, ver el siguiente, y asi sucesivamente.
 *
 * → CAPA: Frameworks & Drivers (Uncle Bob).
 */

import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';

import { EnvSchema } from './env.schema';

export function validateEnv(config: Record<string, unknown>): EnvSchema {
  const validatedConfig = plainToInstance(EnvSchema, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
    forbidUnknownValues: false,
  });

  if (errors.length > 0) {
    const messages = errors
      .map((error) => {
        const constraints = error.constraints ?? {};
        const failures = Object.values(constraints).join(', ');
        return `${error.property}: ${failures}`;
      })
      .join('\n  - ');

    throw new Error(
      `Validacion de variables de entorno fallo:\n  - ${messages}\n\nRevisa tu archivo .env y comparalo contra .env.example.`,
    );
  }

  return validatedConfig;
}
