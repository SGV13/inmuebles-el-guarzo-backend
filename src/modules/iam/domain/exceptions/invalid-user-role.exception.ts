/**
 * InvalidUserRoleException — Lanzada cuando se intenta construir un
 * UserRole con un valor que no esta en la lista de roles permitidos.
 *
 * El mensaje incluye los valores permitidos para que el cliente (sea
 * un dev consumiendo la API o un mapper interno) sepa exactamente que
 * se esperaba. NO incluye datos sensibles, asi que es seguro propagarlo
 * al frontend.
 *
 * → CAPA: Entities (Uncle Bob)
 */

import {
  DomainErrorType,
  DomainException,
} from '../../../../shared-kernel/domain/exceptions/domain.exception';

export class InvalidUserRoleException extends DomainException {
  public readonly type = DomainErrorType.VALIDATION;
  public readonly code = 'IAM.INVALID_USER_ROLE';

  constructor(value: string, allowed: readonly string[]) {
    super(`The value "${value}" is not a valid user role. Allowed values: ${allowed.join(', ')}.`);
  }
}
