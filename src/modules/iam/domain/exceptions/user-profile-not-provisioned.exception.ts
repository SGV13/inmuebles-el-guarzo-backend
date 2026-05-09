/**
 * UserProfileNotProvisionedException — Lanzada cuando un usuario tiene
 * un JWT valido (esta autenticado en Supabase) pero no tiene un
 * UserProfile correspondiente en nuestra BD.
 *
 * Cuando ocurre:
 *   - El admin creo un usuario en Supabase pero olvido crear el
 *     UserProfile local (caso bug, mitigable con HU-05 que crea ambos
 *     atomicamente).
 *   - Un usuario autenticado en otro contexto (otra app que comparte
 *     el mismo proyecto de Supabase) intenta acceder a este backend
 *     (caso teorico, no aplicable hoy).
 *
 * type=NOT_FOUND para que el filter la traduzca a HTTP 404. Es
 * deliberado y correcto: el JWT es valido (no es un 401) pero el
 * recurso "perfil del usuario" no existe (eso es un 404).
 *
 * → CAPA: Entities (Uncle Bob)
 */

import {
  DomainErrorType,
  DomainException,
} from '../../../../shared-kernel/domain/exceptions/domain.exception';

export class UserProfileNotProvisionedException extends DomainException {
  public readonly type = DomainErrorType.NOT_FOUND;
  public readonly code = 'IAM.USER_PROFILE_NOT_PROVISIONED';

  constructor(userId: string) {
    super(
      `User profile for user "${userId}" is not provisioned in the local database. The user is authenticated in the Identity Provider but has no UserProfile.`,
    );
  }
}
