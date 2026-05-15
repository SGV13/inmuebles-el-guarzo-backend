/**
 * Result<TValue, TError> — Tipo discriminado para representar el resultado
 * de una operación que puede fallar.
 *
 * Reemplaza el patrón de lanzamiento de excepciones para errores ESPERADOS
 * (errores de dominio, validaciones de negocio). Las excepciones se reservan
 * para errores INESPERADOS (fallas de infraestructura, bugs).
 *
 * Uso típico:
 *
 *   const result = offer.activate(context);
 *   if (result.isFailure) {
 *     return Result.fail(result.error);
 *   }
 *   // Usar el valor seguro
 *
 * → CAPA: Entities (Uncle Bob)
 * → Aplica los principios "Tell, Don't Ask" y manejo explícito de errores.
 */

export class Result<TValue, TError = Error> {
  private constructor(
    private readonly _isSuccess: boolean,
    private readonly _value: TValue | null,
    private readonly _error: TError | null,
  ) {}

  public get isSuccess(): boolean {
    return this._isSuccess;
  }

  public get isFailure(): boolean {
    return !this._isSuccess;
  }

  public get value(): TValue {
    if (!this._isSuccess) {
      throw new Error('Cannot access value of a failed Result. Check isSuccess first.');
    }
    return this._value as TValue;
  }

  public get error(): TError {
    if (this._isSuccess) {
      throw new Error('Cannot access error of a successful Result. Check isFailure first.');
    }
    return this._error as TError;
  }

  public static ok<TValue, TError = Error>(value: TValue): Result<TValue, TError> {
    return new Result<TValue, TError>(true, value, null);
  }

  public static fail<TValue, TError = Error>(error: TError): Result<TValue, TError> {
    return new Result<TValue, TError>(false, null, error);
  }
}

/**
 * Atajo: cuando el éxito no devuelve valor (operaciones de comando),
 * usar Result<void, TError>.
 */
export type VoidResult<TError = Error> = Result<void, TError>;
