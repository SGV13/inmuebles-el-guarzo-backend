/**
 * InactiveUserCannotLoginException — Lanzada cuando un UserProfile
 * inactivo intenta registrar un login.
 *
 * Distinta de las excepciones de autenticacion (JWT invalido, credenciales
 * malas) que las maneja Supabase Auth y se traducen a 401. Aqui el JWT
 * es valido pero NUESTRO sistema deniega el acceso porque la cuenta
 * local fue desactivada por un administrador.
 *
 * → CAPA: Entities (Uncle Bob)
 */

import {
  DomainErrorType,
  DomainException,
} from '../../../../shared-kernel/domain/exceptions/domain.exception';

export class InactiveUserCannotLoginException extends DomainException {
  public readonly type = DomainErrorType.FORBIDDEN;
  public readonly code = 'IAM.INACTIVE_USER_CANNOT_LOGIN';

  constructor(userProfileId: string) {
    super(`User profile "${userProfileId}" is inactive and cannot register a login.`);
  }
}
