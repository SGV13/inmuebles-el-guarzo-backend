/**
 * Entity — Clase base para todas las entidades del dominio.
 *
 * Una Entity se distingue de un Value Object porque tiene una IDENTIDAD
 * única (un id). Dos entities con propiedades idénticas pero ids distintos
 * son entidades diferentes.
 *
 * Ejemplos: Property, Offer, ContactMessage, UserProfile.
 *
 * → CAPA: Entities (Uncle Bob)
 */

import { UniqueId } from './unique-id.value-object';

export abstract class Entity<TId extends UniqueId = UniqueId> {
  protected readonly _id: TId;

  protected constructor(id: TId) {
    this._id = id;
  }

  public get id(): TId {
    return this._id;
  }

  public equals(other?: Entity<TId>): boolean {
    if (other === undefined) {
      return false;
    }
    if (this === other) {
      return true;
    }
    return this._id.equals(other._id);
  }
}
