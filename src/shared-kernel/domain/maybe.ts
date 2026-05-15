/**
 * Maybe<T> — Tipo que representa un valor opcional sin usar null.
 *
 * Reemplaza T | null y T | undefined en el dominio. Obliga al consumidor
 * a verificar presencia (isPresent / isAbsent) o a proveer default
 * (getOrElse) antes de acceder al valor. El acceso directo a un Maybe
 * ausente lanza una excepcion, lo cual atrapa bugs en tiempo de
 * ejecucion en vez de propagarlos silenciosamente.
 *
 * Reglas de uso en el proyecto:
 *   - DTOs HTTP usan T | undefined (atraviesan JSON).
 *   - Modelo Prisma usa T | null (lo genera Prisma).
 *   - Dominio usa Maybe<T>. Cero nulls, cero undefined sueltos.
 *   - Mappers convierten entre representaciones.
 *
 * Inspirado en Optional<T> de Java, Option<T> de Scala/Rust, Maybe de
 * Haskell. No es un monad completo (no hace falta para el alcance del
 * proyecto), pero tiene los combinadores mas usados.
 *
 * → CAPA: Entities (Uncle Bob)
 */

export class Maybe<T> {
  private constructor(private readonly _value: T | undefined) {}

  /**
   * Crea un Maybe presente con el valor dado. Lanza si recibe undefined
   * o null para preservar el contrato (Maybe.some siempre tiene valor).
   */
  public static some<T>(value: T): Maybe<T> {
    if (value === undefined || value === null) {
      throw new Error(
        'Maybe.some() received undefined or null. Use Maybe.none() for absent values.',
      );
    }
    return new Maybe<T>(value);
  }

  /**
   * Crea un Maybe ausente. Equivalente semantico a "no hay valor",
   * pero tipado y sin usar null.
   */
  public static none<T>(): Maybe<T> {
    return new Maybe<T>(undefined);
  }

  /**
   * Conveniencia para el limite con codigo legacy o externo (Prisma,
   * APIs externas) que usan null o undefined. Convierte al instante a
   * Maybe.some o Maybe.none.
   */
  public static fromNullable<T>(value: T | null | undefined): Maybe<T> {
    return value === null || value === undefined ? Maybe.none<T>() : Maybe.some(value);
  }

  public isPresent(): boolean {
    return this._value !== undefined;
  }

  public isAbsent(): boolean {
    return this._value === undefined;
  }

  /**
   * Acceso directo al valor. Lanza si el Maybe es ausente.
   * Usar SOLO despues de verificar con isPresent.
   */
  public get value(): T {
    if (this._value === undefined) {
      throw new Error('Cannot access value of an absent Maybe. Check isPresent() first.');
    }
    return this._value;
  }

  /**
   * Acceso seguro: si esta ausente, devuelve el default.
   * Forma idiomatica preferida en codigo de dominio.
   */
  public getOrElse(defaultValue: T): T {
    return this._value ?? defaultValue;
  }

  /**
   * Transforma el valor envuelto si esta presente. Si esta ausente,
   * devuelve un Maybe.none del nuevo tipo.
   */
  public map<U>(fn: (value: T) => U): Maybe<U> {
    return this._value === undefined ? Maybe.none<U>() : Maybe.some(fn(this._value));
  }

  /**
   * Ejecuta un side-effect si esta presente. No retorna nada.
   * Util para logging, eventos, etc.
   */
  public ifPresent(fn: (value: T) => void): void {
    if (this._value !== undefined) {
      fn(this._value);
    }
  }

  /**
   * Conveniencia para el limite con BD: convierte a T | null que es
   * lo que Prisma espera al persistir.
   */
  public toNullable(): T | null {
    return this._value ?? null;
  }

  public equals(other?: Maybe<T>): boolean {
    if (other === undefined) {
      return false;
    }
    if (this === other) {
      return true;
    }
    if (this._value === undefined && other._value === undefined) {
      return true;
    }
    if (this._value === undefined || other._value === undefined) {
      return false;
    }
    return this._value === other._value;
  }
}
