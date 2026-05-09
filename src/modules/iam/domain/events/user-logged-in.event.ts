/**
 * UserLoggedIn — Emitido cuando un UserProfile registra exitosamente
 * un login en el sistema.
 *
 * Suscriptores esperados:
 *   - audit: registra el login en audit_log con timestamp y rol.
 *
 * Notar que NO existe un evento UserLoginAttempted o UserLoginFailed.
 * Razones:
 *   - Login con credenciales malas: lo maneja Supabase Auth y nunca
 *     llega al backend. No tenemos como auditarlo aqui.
 *   - Login con cuenta desactivada: genera InactiveUserCannotLoginException
 *     que se loggea via filter, no via evento de dominio. Eso es porque
 *     "intento fallido" no es un cambio de estado del aggregate; es solo
 *     un error.
 *
 * → CAPA: Entities (Uncle Bob)
 */

import { DomainEvent } from '../../../../shared-kernel/domain/domain-event.base';
import { UniqueId } from '../../../../shared-kernel/domain/unique-id.value-object';

import { UserRoleValue } from '../value-objects/user-role.value-object';

export class UserLoggedIn extends DomainEvent {
  public constructor(
    public readonly userProfileId: UniqueId,
    public readonly role: UserRoleValue,
    public readonly loggedInAt: Date,
  ) {
    super();
  }

  public get eventName(): string {
    return 'UserLoggedIn';
  }
}
