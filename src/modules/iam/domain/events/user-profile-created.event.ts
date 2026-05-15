/**
 * UserProfileCreated — Emitido cuando se crea un UserProfile en el sistema.
 *
 * Suscriptores esperados (en otros modulos, fuera de IAM):
 *   - audit: registra el evento en audit_log para trazabilidad.
 *   - notifications (futuro): podria enviar correo de bienvenida.
 *
 * El evento NO carga el aggregate completo, solo los datos minimos que
 * un suscriptor podria necesitar. Si un suscriptor quiere mas datos,
 * que consulte el repositorio. Mantener los eventos delgados es buena
 * higiene: facilita futura serializacion (event sourcing, message broker).
 *
 * → CAPA: Entities (Uncle Bob)
 */

import { DomainEvent } from '../../../../shared-kernel/domain/domain-event.base';
import { UniqueId } from '../../../../shared-kernel/domain/unique-id.value-object';

import { UserRoleValue } from '../value-objects/user-role.value-object';

export class UserProfileCreated extends DomainEvent {
  public constructor(
    public readonly userProfileId: UniqueId,
    public readonly email: string,
    public readonly role: UserRoleValue,
  ) {
    super();
  }

  public get eventName(): string {
    return 'UserProfileCreated';
  }
}
