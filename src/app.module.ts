/**
 * AppModule — Módulo raíz de la aplicación.
 *
 * Compone los módulos del sistema: el SharedKernelModule (global) y, más
 * adelante, los 8 módulos de bounded context. Por ahora solo el shared-kernel.
 *
 * No define controllers ni providers propios: los controllers viven en
 * los módulos de bounded context, los providers compartidos en el
 * SharedKernelModule.
 */

import { Module } from '@nestjs/common';

import { SharedKernelModule } from './shared-kernel/shared-kernel.module';

@Module({
  imports: [SharedKernelModule],
})
export class AppModule {}
