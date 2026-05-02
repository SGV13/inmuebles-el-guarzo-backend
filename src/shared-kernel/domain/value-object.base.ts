/**
 * ValueObject — Clase base para Value Objects con múltiples propiedades.
 *
 * Un Value Object es un objeto que se identifica por sus valores, no por
 * una identidad. Dos value objects con los mismos valores son IGUALES,
 * incluso si son instancias distintas en memoria.
 *
 * Ejemplos: Money(amount, currency), Address(street, city, country),
 * DateRange(from, to).
 *
 * Para Value Objects con un solo valor primitivo, suele ser suficiente
 * extender directamente sin esta clase base. Esta base es útil cuando
 * el VO tiene múltiples propiedades.
 *
 * → CAPA: Entities (Uncle Bob)
 */

export abstract class ValueObject<T extends Record<string, unknown>> {
  protected readonly props: T;

  protected constructor(props: T) {
    this.props = Object.freeze(props);
  }

  public equals(other?: ValueObject<T>): boolean {
    if (other === undefined || other === null) {
      return false;
    }
    if (other.props === undefined) {
      return false;
    }
    return JSON.stringify(this.props) === JSON.stringify(other.props);
  }
}
