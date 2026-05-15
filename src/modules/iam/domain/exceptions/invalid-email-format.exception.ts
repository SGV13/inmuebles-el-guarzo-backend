/**
 * InvalidEmailFormatException — Lanzada cuando se intenta construir un
 * Email con un valor que no cumple el formato esperado.
 *
 * Es una excepcion de DOMINIO (no de infraestructura) porque "email
 * valido" es una regla del negocio: cualquier UserProfile DEBE tener un
 * email valido. Si llega un valor invalido al constructor, hay un bug
 * de validacion aguas arriba (DTO, mapper, etc.) y queremos saberlo
 * inmediatamente.
 *
 * El filtro DomainExceptionFilter la traduce a HTTP 400.
 *
 * → CAPA: Entities (Uncle Bob)
 */

import {
  DomainErrorType,
  DomainException,
} from '../../../../shared-kernel/domain/exceptions/domain.exception';

export class InvalidEmailFormatException extends DomainException {
  public readonly type = DomainErrorType.VALIDATION;
  public readonly code = 'IAM.INVALID_EMAIL_FORMAT';

  constructor(value: string) {
    super(`The value "${value}" is not a valid email address.`);
  }
}
