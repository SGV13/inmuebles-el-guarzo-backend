/**
 * AppModule — Modulo raiz de la aplicacion.
 *
 * Compone los modulos del sistema. ConfigModule va PRIMERO porque
 * valida las variables de entorno al bootstrap; si falla, la app
 * no arranca y los modulos siguientes ni siquiera se inicializan.
 *
 * Marcado como isGlobal=true para que cualquier modulo pueda
 * inyectar ConfigService sin tener que importar ConfigModule.
 */

import { APP_GUARD } from '@nestjs/core';
import { IamModule } from './modules/iam/iam.module';
import { JwtAuthGuard } from './modules/iam/presentation/http/guards/jwt-auth.guard';

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { validateEnv } from './shared-kernel/infrastructure/config/env.validator';
import { SharedKernelModule } from './shared-kernel/shared-kernel.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      validate: validateEnv,
    }),
    SharedKernelModule,
    IamModule,
  ],

  providers: [
    {
      provide: APP_GUARD,
      useExisting: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
