/**
 * UserRole — Value Object que representa el rol de un usuario en el sistema.
 *
 * Roles permitidos (lenguaje ubicuo del negocio, en espanol):
 *   - ADMINISTRADOR: gestiona el sistema completo, incluyendo otros
 *     usuarios y configuracion del catalogo.
 *   - ASESOR: gestiona inmuebles, ofertas, mensajes de contacto y
 *     solicitudes de publicacion. NO crea ni desactiva otros usuarios.
 *
 * Los strings literales DEBEN coincidir 1:1 con el enum del schema.prisma.
 * Si cambia uno, se rompe la lectura/escritura del UserProfile.
 *
 * Inmutable: para cambiar el rol de un UserProfile, se reemplaza el VO
 * entero (idealmente con un evento de dominio UserRoleChanged).
 *
 * → CAPA: Entities (Uncle Bob)
 */

import { InvalidUserRoleException } from '../exceptions/invalid-user-role.exception';

export const USER_ROLE_VALUES = ['ADMIN', 'ADVISOR'] as const;
export type UserRoleValue = (typeof USER_ROLE_VALUES)[number];

export class UserRole {
  private readonly _value: UserRoleValue;

  private constructor(value: UserRoleValue) {
    this._value = value;
  }

  public static create(rawValue: string): UserRole {
    if (!UserRole.isValidRole(rawValue)) {
      throw new InvalidUserRoleException(rawValue, USER_ROLE_VALUES);
    }
    return new UserRole(rawValue);
  }

  public static admin(): UserRole {
    return new UserRole('ADMIN');
  }

  public static advisor(): UserRole {
    return new UserRole('ADVISOR');
  }

  public get value(): UserRoleValue {
    return this._value;
  }

  public isAdmin(): boolean {
    return this._value === 'ADMIN';
  }

  public isAdvisor(): boolean {
    return this._value === 'ADVISOR';
  }

  public equals(other?: UserRole): boolean {
    if (other === undefined || other === null) {
      return false;
    }
    if (this === other) {
      return true;
    }
    return this._value === other._value;
  }

  private static isValidRole(value: string): value is UserRoleValue {
    return USER_ROLE_VALUES.includes(value as UserRoleValue);
  }
}
