/**
 * PrismaService — Wrapper inyectable de PrismaClient para el sistema completo.
 *
 * Una sola instancia gestiona el pool de conexiones a Postgres. Todos los
 * repositorios de los 8 bounded contexts inyectan este servicio en vez de
 * crear su propio PrismaClient.
 *
 * Lifecycle:
 *   - onModuleInit:    abre la conexión al arrancar la app.
 *   - onModuleDestroy: la cierra limpio al apagar la app.
 *
 * Por qué importa el lifecycle: Neon free tier tiene un máximo bajo de
 * conexiones concurrentes. Si la app no cierra limpio, las conexiones
 * quedan abiertas en el pool de Neon y eventualmente nos rechaza nuevas.
 *
 * → CAPA: Frameworks & Drivers (Uncle Bob)
 * → DIAGRAMA DE COMPONENTES: aparece como adapter de salida hacia Postgres,
 *   compartido por todos los repositorios.
 */

import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    super({
      // En desarrollo conviene ver las queries para depurar.
      // En producción solo errores y advertencias para no saturar Better Stack.
      log: process.env.NODE_ENV === 'production' ? ['error', 'warn'] : ['query', 'error', 'warn'],
    });
  }

  public async onModuleInit(): Promise<void> {
    await this.$connect();
    this.logger.log('Prisma conectado a Postgres.');
  }

  public async onModuleDestroy(): Promise<void> {
    await this.$disconnect();
    this.logger.log('Prisma desconectado.');
  }
}
