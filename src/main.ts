/**
 * main.ts — Entry point de la aplicación NestJS.
 *
 * Configura el bootstrap completo: filtros globales, validación, seguridad,
 * documentación OpenAPI y CORS. Cualquier configuración que aplique a
 * TODOS los endpoints de la app va aquí.
 */

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';

import { AppModule } from './app.module';
import { DomainExceptionFilter } from './shared-kernel/presentation/filters/domain-exception.filter';
import { PrismaExceptionFilter } from './shared-kernel/presentation/filters/prisma-exception.filter';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, {
    // Buffer de logs hasta que el logger esté configurado.
    // Cuando integremos Pino, esto se reemplaza por el logger custom.
    bufferLogs: true,
  });

  // Prefijo global: todos los endpoints quedan bajo /api/v1/...
  app.setGlobalPrefix('api/v1');

  // Headers de seguridad (X-Frame-Options, HSTS, etc.).
  app.use(helmet());

  // CORS: permisivo en desarrollo, se restringe cuando haya frontend desplegado.
  app.enableCors({
    origin: true,
    credentials: true,
  });

  // ValidationPipe global con configuración estricta.
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Filtros globales. Orden de registro inverso al de aplicación:
  // PrismaExceptionFilter se aplica PRIMERO (intercepta errores de Prisma
  // y los re-lanza como DomainException). DomainExceptionFilter aplica
  // DESPUÉS para capturar la DomainException ya traducida.
  app.useGlobalFilters(new DomainExceptionFilter(), new PrismaExceptionFilter());

  // Documentación OpenAPI/Swagger en /api/docs.
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Inmuebles El Guarzo API')
    .setDescription('API del backend de Inmuebles El Guarzo v2.')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, document);

  const port = Number(process.env.PORT) || 3000;
  await app.listen(port);
}

void bootstrap();
