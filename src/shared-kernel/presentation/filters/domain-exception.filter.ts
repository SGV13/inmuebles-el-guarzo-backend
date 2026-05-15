/**
 * DomainExceptionFilter — Filtro global que traduce DomainException a HTTP.
 *
 * Captura cualquier DomainException (o sus subclases) que escape de los
 * Controllers y la convierte en una respuesta JSON con shape consistente.
 *
 * El mapeo del `type` a HTTP status code está centralizado aquí. Los
 * errores de dominio NO conocen HTTP; eso es responsabilidad de la capa
 * de presentación.
 *
 * Decisiones:
 *   - Sin stack trace en la respuesta (filtra estructura interna).
 *   - El `message` es para devs/logs, no para el usuario final.
 *     El frontend usa `code` con i18next para mostrar mensajes traducidos.
 *   - Logging de cada excepción para que Sentry/Better Stack la capturen.
 *
 * → CAPA: Interface Adapters (Uncle Bob), específicamente Presenters.
 */

import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, Logger } from '@nestjs/common';
import { Request, Response } from 'express';

import { DomainErrorType, DomainException } from '../../domain/exceptions/domain.exception';

interface ErrorResponseBody {
  code: string;
  message: string;
  type: DomainErrorType;
  timestamp: string;
  path: string;
}

@Catch(DomainException)
export class DomainExceptionFilter implements ExceptionFilter<DomainException> {
  private readonly logger = new Logger(DomainExceptionFilter.name);

  public catch(exception: DomainException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const httpStatus = this.mapTypeToHttpStatus(exception.type);

    const body: ErrorResponseBody = {
      code: exception.code,
      message: exception.message,
      type: exception.type,
      timestamp: new Date().toISOString(),
      path: request.url,
    };

    this.logger.warn(
      `Domain exception [${exception.code}] at ${request.method} ${request.url}: ${exception.message}`,
    );

    response.status(httpStatus).json(body);
  }

  private mapTypeToHttpStatus(type: DomainErrorType): number {
    switch (type) {
      case DomainErrorType.VALIDATION:
        return HttpStatus.BAD_REQUEST;
      case DomainErrorType.UNAUTHORIZED:
        return HttpStatus.UNAUTHORIZED;
      case DomainErrorType.FORBIDDEN:
        return HttpStatus.FORBIDDEN;
      case DomainErrorType.NOT_FOUND:
        return HttpStatus.NOT_FOUND;
      case DomainErrorType.CONFLICT:
        return HttpStatus.CONFLICT;
      case DomainErrorType.BUSINESS_RULE:
        return HttpStatus.UNPROCESSABLE_ENTITY;
      default:
        return HttpStatus.INTERNAL_SERVER_ERROR;
    }
  }
}
