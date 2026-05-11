/**
 * MePresenter — Transforma el GetCurrentUserOutput (DTO interno del use
 * case) a la forma JSON exacta que devolvemos al cliente HTTP.
 *
 * Responsabilidades:
 *   - Serializar Date a ISO 8601 string explicito (vs depender del JSON
 *     default).
 *   - Convertir `undefined` a `null` (HTTP es mas claro con null).
 *   - Documentar contractualmente los campos expuestos hacia afuera.
 *
 * → CAPA: Interface Adapters (Uncle Bob)
 */

import { GetCurrentUserOutput } from '../../../application/features/get-current-user/dtos/get-current-user-output.dto';

export interface MeHttpResponse {
  id: string;
  email: string;
  fullName: string;
  phone: string | null;
  role: string;
  isActive: boolean;
  lastLoginAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export class MePresenter {
  public static toHttp(output: GetCurrentUserOutput): MeHttpResponse {
    return {
      id: output.id,
      email: output.email,
      fullName: output.fullName,
      phone: output.phone ?? null,
      role: output.role,
      isActive: output.isActive,
      lastLoginAt: output.lastLoginAt?.toISOString() ?? null,
      createdAt: output.createdAt.toISOString(),
      updatedAt: output.updatedAt.toISOString(),
    };
  }
}
