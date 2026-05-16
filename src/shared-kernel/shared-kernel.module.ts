import { Global, Module } from '@nestjs/common';

import { EVENT_BUS } from './infrastructure/event-bus/event-bus.port';
import { InMemoryEventBus } from './infrastructure/event-bus/in-memory-event-bus';
import { PrismaService } from './infrastructure/prisma/prisma.service';
import { HealthController } from './presentation/http/controllers/health.controller';

@Global()
@Module({
  controllers: [HealthController],
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
