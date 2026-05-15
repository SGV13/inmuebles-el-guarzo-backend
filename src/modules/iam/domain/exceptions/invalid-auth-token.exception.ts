/**
 * InvalidAuthTokenException — Lanzada cuando el JWT presentado por
 * el cliente es invalido (firma incorrecta, expirado, issuer no
 * esperado, audience no esperado, falta de claim requerido, etc.).
 *
 * Aunque la deteccion concreta del JWT invalido ocurre en el adapter
 * de Supabase Auth (infraestructura), la excepcion se define en el
 * dominio de IAM porque "token de autenticacion invalido" es un
 * concepto del modulo, no del proveedor concreto. Si manana cambiamos
 * de Supabase a Auth0, la excepcion sigue siendo la misma.
 *
 * type=UNAUTHORIZED para que el filter la traduzca a HTTP 401.
 *
 * → CAPA: Entities (Uncle Bob)
 */

import {
  DomainErrorType,
  DomainException,
} from '../../../../shared-kernel/domain/exceptions/domain.exception';

export class InvalidAuthTokenException extends DomainException {
  public readonly type = DomainErrorType.UNAUTHORIZED;
  public readonly code = 'IAM.INVALID_AUTH_TOKEN';

  constructor(reason: string) {
    super(`Authentication token is invalid: ${reason}`);
  }
}
