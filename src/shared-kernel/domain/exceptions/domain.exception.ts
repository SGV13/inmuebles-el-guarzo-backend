/**
 * DomainException — Excepción base para todos los errores del dominio.
 *
 * Cualquier error que represente una violación de las reglas del negocio
 * (ejemplo: "no se puede activar una oferta sin precio", "este email ya está
 * registrado") debe extender de esta clase.
 *
 * Las excepciones de dominio NO deben mezclarse con excepciones de
 * infraestructura (errores de base de datos, errores HTTP). El filtro
 * de excepciones en presentation/ las captura y traduce a respuestas HTTP.
 *
 * → CAPA: Entities (Uncle Bob)
 */

export abstract class DomainException extends Error {
  protected constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
