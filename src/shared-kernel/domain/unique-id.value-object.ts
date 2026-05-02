/**
 * UniqueId — Value Object base que representa un identificador único universal (UUID v4).
 *
 * Sirve como tipo fuerte para identificar entidades del dominio, evitando que
 * dos identificadores de tipos distintos (ejemplo: UserId y PropertyId) puedan
 * intercambiarse accidentalmente al ser ambos `string`.
 *
 * → CAPA: Entities (Uncle Bob)
 * → DIAGRAMA DE COMPONENTES: aparece como tipo base reutilizado por todas las
 *   entidades del sistema.
 */

import { randomUUID } from 'node:crypto';

import { DomainException } from './exceptions/domain.exception';

export class UniqueId {
  private readonly _value: string;

  protected constructor(value: string) {
    this._value = value;
  }

  /**
   * Genera un nuevo UniqueId con un UUID v4 aleatorio.
   * Usar este método al crear una entidad nueva.
   */
  public static generate(): UniqueId {
    return new UniqueId(randomUUID());
  }

  /**
   * Reconstruye un UniqueId a partir de un valor existente (ejemplo: leído de la BD).
   * Valida que el valor sea un UUID v4 válido.
   *
   * @throws InvalidUniqueIdException si el valor no es un UUID válido.
   */
  public static fromString(value: string): UniqueId {
    if (!UniqueId.isValidUuid(value)) {
      throw new InvalidUniqueIdException(value);
    }
    return new UniqueId(value);
  }

  public get value(): string {
    return this._value;
  }

  public equals(other: UniqueId): boolean {
    return this._value === other._value;
  }

  private static isValidUuid(value: string): boolean {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(value);
  }
}

export class InvalidUniqueIdException extends DomainException {
  constructor(value: string) {
    super(`The value "${value}" is not a valid UUID.`);
  }
}
