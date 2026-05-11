/**
 * IamModule — Wiring de DI completo del modulo Identity & Access Management.
 *
 * Registra:
 *   - El controller MeController
 *   - El interactor GetCurrentUser bajo su Symbol token
 *   - El adapter de persistencia bajo USER_PROFILE_REPOSITORY
 *   - El adapter de identidad bajo IDENTITY_PROVIDER
 *   - El JwtAuthGuard (exportado para que AppModule lo registre como global)
 *
 * Exporta JwtAuthGuard porque AppModule lo necesita para hacerlo guard
 * global via APP_GUARD. Tambien exporta IDENTITY_PROVIDER por si otros
 * modulos llegan a necesitarlo en el futuro (poco probable, pero barato).
 */

import { Module } from '@nestjs/common';

import { GET_CURRENT_USER_INPUT_PORT } from './application/features/get-current-user/dtos/get-current-user.input-port';
import { GetCurrentUserInteractor } from './application/features/get-current-user/get-current-user.interactor';
import { IDENTITY_PROVIDER } from './application/ports/output/identity-provider.port';
import { USER_PROFILE_REPOSITORY } from './application/ports/output/user-profile.repository.port';
import { SupabaseAuthAdapter } from './infrastructure/identity-provider/supabase/supabase-auth.adapter';
import { UserProfilePrismaRepositoryAdapter } from './infrastructure/persistence/prisma/user-profile.prisma.repository.adapter';
import { MeController } from './presentation/http/controllers/me.controller';
import { JwtAuthGuard } from './presentation/http/guards/jwt-auth.guard';

@Module({
  controllers: [MeController],
  providers: [
    { provide: USER_PROFILE_REPOSITORY, useClass: UserProfilePrismaRepositoryAdapter },
    { provide: IDENTITY_PROVIDER, useClass: SupabaseAuthAdapter },
    { provide: GET_CURRENT_USER_INPUT_PORT, useClass: GetCurrentUserInteractor },
    JwtAuthGuard,
  ],
  exports: [JwtAuthGuard, IDENTITY_PROVIDER],
})
export class IamModule {}
