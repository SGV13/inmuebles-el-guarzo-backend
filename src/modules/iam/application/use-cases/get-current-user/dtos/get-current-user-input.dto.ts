/**
 * GetCurrentUserInput — Datos que el caso de uso necesita para ejecutarse.
 *
 * El userId se obtiene del decorator @CurrentUser() en el controller,
 * que a su vez lo extrae del request despues de que el JwtAuthGuard
 * valido el JWT.
 *
 * → CAPA: Use Cases (Uncle Bob)
 */

import { UniqueId } from '../../../../../../shared-kernel/domain/unique-id.value-object';

export interface GetCurrentUserInput {
  userId: UniqueId;
}
