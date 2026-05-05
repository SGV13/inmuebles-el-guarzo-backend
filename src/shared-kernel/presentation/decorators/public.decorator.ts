/**
 * @Public() — Marker decorator que indica que un endpoint NO requiere autenticación.
 *
 * Por defecto, el JwtAuthGuard global rechaza toda petición sin JWT válido.
 * Este decorator marca el endpoint con metadata que el guard lee para
 * permitir el paso sin autenticación.
 *
 * Uso:
 *
 *   @Public()
 *   @Post('publication-requests')
 *   public submitPublicationRequest(...) { ... }
 *
 * El guard concreto (JwtAuthGuard, en módulo IAM) lee este metadata con
 * el Reflector de NestJS y decide si validar o no el token.
 *
 * → CAPA: Interface Adapters (Uncle Bob).
 */

import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';

export const Public = (): MethodDecorator & ClassDecorator => SetMetadata(IS_PUBLIC_KEY, true);
