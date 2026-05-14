/**
 * GetCurrentUserInputPort — Contrato del caso de uso GetCurrentUser.
 *
 * Lo implementa GetCurrentUserInteractor. El controller MeController
 * depende SOLO de esta interfaz (no del Interactor concreto), y la
 * inyeccion la resuelve NestJS via Symbol token.
 *
 * Comportamiento:
 *   - Recibe el id del usuario autenticado (resuelto por JwtAuthGuard).
 *   - Busca el UserProfile correspondiente en BD.
 *   - Si no existe: Result.fail(UserProfileNotProvisionedException) → 404.
 *   - Si existe: Result.ok(snapshot).
 *
 * Por que NO actualiza lastLoginAt en este hito:
 *   /me se invoca tipicamente en cada navegacion de la SPA. Actualizar
 *   lastLoginAt cada vez deriva en "lastActivityAt", no en "lastLoginAt".
 *   El registro real se va a disparar en un hito futuro cuando tengamos
 *   el trigger correcto (comparar JWT.iat contra lastLoginAt almacenado,
 *   o webhook de Supabase). Por ahora /me es query pura.
 *
 * → CAPA: Use Cases (Uncle Bob)
 */

import { InputPort } from '../../../../../../shared-kernel/application/ports/input-port';

import { GetCurrentUserInput } from '../dtos/get-current-user-input.dto';
import { GetCurrentUserOutput } from '../dtos/get-current-user-output.dto';

export type GetCurrentUserInputPort = InputPort<GetCurrentUserInput, GetCurrentUserOutput>;

export const GET_CURRENT_USER_INPUT_PORT = Symbol('GetCurrentUserInputPort');
