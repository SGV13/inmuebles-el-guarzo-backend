/**
 * @CurrentUser() — Parameter decorator que inyecta el AuthenticatedUser
 * extraido por JwtAuthGuard.
 *
 * Uso:
 *   @Get()
 *   getMe(@CurrentUser() user: AuthenticatedUser) { ... }
 *
 * Si se usa en una ruta @Public() (sin pasar por el guard), lanza error
 * de programacion: el guard es el responsable de poblar el campo y este
 * decorator asume que ya esta. Es defensive programming contra mis-wiring.
 */

import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { Request } from 'express';

import { AuthenticatedUser } from '../../../application/ports/output/identity-provider.port';

interface AuthenticatedRequest extends Request {
  authenticatedUser?: AuthenticatedUser;
}

export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): AuthenticatedUser => {
    const request = ctx.switchToHttp().getRequest<AuthenticatedRequest>();
    if (request.authenticatedUser === undefined) {
      throw new Error(
        'CurrentUser decorator used on a route not protected by JwtAuthGuard. ' +
          'Either add the guard or remove @CurrentUser() from the handler signature.',
      );
    }
    return request.authenticatedUser;
  },
);
