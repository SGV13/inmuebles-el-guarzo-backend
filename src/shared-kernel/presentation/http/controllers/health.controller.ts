/**
 * HealthController — Endpoint de health check para Render y futuros
 * load balancers. Devuelve 200 OK cuando la aplicacion esta lista.
 *
 * → CAPA: Frameworks & Drivers (Uncle Bob)
 */

import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { Public } from '../../decorators/public.decorator';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  @Public()
  @Get()
  @ApiOperation({ summary: 'Health check endpoint' })
  public check(): { status: string; timestamp: string } {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
    };
  }
}
