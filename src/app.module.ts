/**
 * AppModule — Modulo raiz de la aplicacion.
 *
 * Compone los modulos del sistema. ConfigModule va PRIMERO porque
 * valida las variables de entorno al bootstrap; si falla, la app
 * no arranca y los modulos siguientes ni siquiera se inicializan.
 *
 * LoggerModule va SEGUNDO para que Pino esté disponible antes de
 * que cualquier módulo de negocio empiece a loggear.
 */

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { LoggerModule } from 'nestjs-pino';

import { IamModule } from './modules/iam/iam.module';
import { JwtAuthGuard } from './modules/iam/presentation/http/guards/jwt-auth.guard';
import { validateEnv } from './shared-kernel/infrastructure/config/env.validator';
import { pinoLoggerConfig } from './shared-kernel/infrastructure/logger/pino-logger.config';
import { SharedKernelModule } from './shared-kernel/shared-kernel.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      validate: validateEnv,
    }),
    LoggerModule.forRoot(pinoLoggerConfig),
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
