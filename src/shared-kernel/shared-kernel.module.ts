/**
 * SharedKernelModule — Módulo global de NestJS que registra los providers
 * compartidos por todos los bounded contexts del sistema.
 *
 * Marcado como @Global() para evitar que cada módulo de bounded context
 * tenga que importarlo explícitamente. Sus providers exportados quedan
 * disponibles globalmente.
 *
 * Decisión: solo este módulo es global. Los módulos de bounded context
 * (iam, properties, etc.) NO son globales; deben importarse explícitamente
 * cuando uno depende de otro, para mantener la trazabilidad de dependencias
 * entre contextos.
 *
 * Providers expuestos:
 *   - PrismaService:  cliente único de Prisma para todos los repositorios.
 *   - EVENT_BUS:      Symbol token que resuelve a InMemoryEventBus.
 *
 * → CAPA: Frameworks & Drivers (Uncle Bob), específicamente la composición
 *   de NestJS que conecta las piezas.
 */

import { Global, Module } from '@nestjs/common';

import { EVENT_BUS } from './infrastructure/event-bus/event-bus.port';
import { InMemoryEventBus } from './infrastructure/event-bus/in-memory-event-bus';
import { PrismaService } from './infrastructure/prisma/prisma.service';

@Global()
@Module({
  providers: [
    PrismaService,
    {
      provide: EVENT_BUS,
      useClass: InMemoryEventBus,
    },
  ],
  exports: [PrismaService, EVENT_BUS],
})
export class SharedKernelModule {}
