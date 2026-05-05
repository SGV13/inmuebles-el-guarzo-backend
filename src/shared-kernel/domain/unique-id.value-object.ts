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

import { DomainErrorType, DomainException } from './exceptions/domain.exception';

export class UniqueId {
  private readonly _value: string;

  protected constructor(value: string) {
    this._value = value;
  }

  public static generate(): UniqueId {
    return new UniqueId(randomUUID());
  }

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
    // Acepta UUID v1 a v8 conforme a RFC 4122 + drafts modernos.
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(value);
  }
}

export class InvalidUniqueIdException extends DomainException {
  public readonly type = DomainErrorType.VALIDATION;
  public readonly code = 'SHARED.INVALID_UUID';

  constructor(value: string) {
    super(`The value "${value}" is not a valid UUID.`);
  }
}
