/**
 * Categorías de errores de dominio.
 * El filtro HTTP las traduce a status codes:
 *   VALIDATION    -> 400
 *   UNAUTHORIZED  -> 401
 *   FORBIDDEN     -> 403
 *   NOT_FOUND     -> 404
 *   CONFLICT      -> 409
 *   BUSINESS_RULE -> 422
 */
export enum DomainErrorType {
  VALIDATION = 'VALIDATION',
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  NOT_FOUND = 'NOT_FOUND',
  CONFLICT = 'CONFLICT',
  BUSINESS_RULE = 'BUSINESS_RULE',
}

export abstract class DomainException extends Error {
  public abstract readonly type: DomainErrorType;
  public abstract readonly code: string;

  protected constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
