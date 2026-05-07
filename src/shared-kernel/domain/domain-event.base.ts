/**
 * DomainEvent — Clase base para todos los eventos de dominio.
 *
 * Un evento de dominio representa algo que YA OCURRIÓ en el dominio,
 * relevante para otros componentes del sistema. Se publican en pasado:
 * AdvisorCreated, OfferActivated, ContactMessageReceived.
 *
 * Los eventos permiten desacoplar bounded contexts: cuando algo importante
 * pasa en un módulo, lo notifica sin saber quién lo escucha.
 *
 * → CAPA: Entities (Uncle Bob)
 * → DIAGRAMA DE SECUENCIA: los eventos aparecen como mensajes asíncronos
 *   entre componentes.
 */

import { UniqueId } from './unique-id.value-object';

export abstract class DomainEvent {
  public readonly eventId: UniqueId;
  public readonly occurredAt: Date;

  protected constructor() {
    this.eventId = UniqueId.generate();
    this.occurredAt = new Date();
  }

  /**
   * Nombre del evento para identificarlo en logs y suscripciones.
   * Cada subclase debe implementarlo retornando un string descriptivo
   * en formato pasado: "AdvisorCreated", "OfferFinalized".
   */
  public abstract get eventName(): string;
}
