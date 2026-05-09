/**
 * GetCurrentUserInteractor — Implementacion del caso de uso GetCurrentUser.
 *
 * QUERY PURA: no muta estado, no emite eventos, no abre transacciones.
 * Cualquier endpoint que necesite "datos del usuario actual" usa este
 * interactor.
 *
 * Errores de dominio que retorna en Result.fail:
 *   - UserProfileNotProvisionedException: el JWT es valido pero el
 *     usuario no tiene UserProfile local. Mapea a HTTP 404.
 *
 * Errores de infraestructura (BD inaccesible, timeout, etc.) suben como
 * excepciones hasta el filter, no se devuelven en Result. Esa es la
 * disciplina del InputPort base: solo errores de dominio en Result.
 *
 * → CAPA: Use Cases (Uncle Bob)
 */

import { Inject, Injectable } from '@nestjs/common';

import { DomainException } from '../../../../../shared-kernel/domain/exceptions/domain.exception';
import { Result } from '../../../../../shared-kernel/domain/result';

import { UserProfile } from '../../../domain/aggregates/user-profile.aggregate';
import { UserProfileNotProvisionedException } from '../../../domain/exceptions/user-profile-not-provisioned.exception';
import {
  USER_PROFILE_REPOSITORY,
  UserProfileRepositoryPort,
} from '../../ports/output/user-profile.repository.port';

import { GetCurrentUserInput } from './dtos/get-current-user-input.dto';
import { GetCurrentUserOutput } from './dtos/get-current-user-output.dto';
import { GetCurrentUserInputPort } from './dtos/get-current-user.input-port';

@Injectable()
export class GetCurrentUserInteractor implements GetCurrentUserInputPort {
  public constructor(
    @Inject(USER_PROFILE_REPOSITORY)
    private readonly userProfileRepository: UserProfileRepositoryPort,
  ) {}

  public async execute(
    input: GetCurrentUserInput,
  ): Promise<Result<GetCurrentUserOutput, DomainException>> {
    const maybeProfile = await this.userProfileRepository.findById(input.userId);

    if (maybeProfile.isAbsent()) {
      return Result.fail(new UserProfileNotProvisionedException(input.userId.value));
    }

    const output = GetCurrentUserInteractor.toOutput(maybeProfile.value);
    return Result.ok(output);
  }

  private static toOutput(profile: UserProfile): GetCurrentUserOutput {
    return {
      id: profile.id.value,
      email: profile.email.value,
      fullName: profile.fullName.value,
      phone: profile.phone.isPresent() ? profile.phone.value : undefined,
      role: profile.role.value,
      isActive: profile.isActive,
      lastLoginAt: profile.lastLoginAt.isPresent() ? profile.lastLoginAt.value : undefined,
      createdAt: profile.createdAt,
      updatedAt: profile.updatedAt,
    };
  }
}
