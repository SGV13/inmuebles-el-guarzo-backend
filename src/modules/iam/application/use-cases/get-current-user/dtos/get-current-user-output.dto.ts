/**
 * GetCurrentUserOutput — Snapshot serializable del UserProfile devuelto
 * por GetCurrentUser.
 *
 * Tipo plano (strings, booleans, Date) listo para JSON. NO contiene VOs;
 * la traduccion VO → primitivo la hace el interactor en su `toOutput`.
 *
 * Disciplina anti-null preservada: campos que en el dominio son Maybe<T>
 * se exponen como T | undefined al cruzar a esta capa de salida. JSON
 * omite los campos undefined al serializar, lo cual es semanticamente
 * correcto ("el campo no esta presente").
 *
 * → CAPA: Use Cases (Uncle Bob)
 */

import { UserRoleValue } from '../../../../domain/value-objects/user-role.value-object';

export interface GetCurrentUserOutput {
  id: string;
  email: string;
  fullName: string;
  phone: string | undefined;
  role: UserRoleValue;
  isActive: boolean;
  lastLoginAt: Date | undefined;
  createdAt: Date;
  updatedAt: Date;
}
