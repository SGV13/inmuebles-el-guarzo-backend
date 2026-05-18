/**
 * PrismaExceptionFilter — Traduce errores conocidos de Prisma a DomainException.
 *
 * Cuando Prisma lanza un error específico (unique violation, foreign key,
 * record not found), este filter lo intercepta y lo convierte en una
 * DomainException equivalente. La DomainException luego es capturada por
 * el DomainExceptionFilter y formateada consistentemente.
 *
 * Por qué no manejar el error directamente acá: separación de
 * responsabilidades. Este filter conoce Prisma; el otro conoce HTTP.
 * Ninguno conoce los dos a la vez.
 *
 * Cobertura inicial: solo P2002 (unique violation), que es el más común.
 * Otros códigos se agregan cuando aparezcan en el desarrollo.
 *
 * → CAPA: Interface Adapters (Uncle Bob).
 */

import { ArgumentsHost, Catch, ExceptionFilter, Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import * as Sentry from '@sentry/nestjs';
import { DomainErrorType, DomainException } from '../../domain/exceptions/domain.exception';

import { DomainExceptionFilter } from './domain-exception.filter';

class UniqueConstraintViolationException extends DomainException {
  public readonly type = DomainErrorType.CONFLICT;
  public readonly code = 'SHARED.UNIQUE_CONSTRAINT_VIOLATION';

  constructor(target: string) {
    super(`A record with the same "${target}" already exists.`);
  }
}

class RecordNotFoundException extends DomainException {
  public readonly type = DomainErrorType.NOT_FOUND;
  public readonly code = 'SHARED.RECORD_NOT_FOUND';

  constructor() {
    super('The requested record does not exist.');
  }
}

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter<Prisma.PrismaClientKnownRequestError> {
  private readonly logger = new Logger(PrismaExceptionFilter.name);
  private readonly domainFilter = new DomainExceptionFilter();

  public catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost): void {
    const translated = this.translate(exception);

    if (translated === null) {
      this.logger.error(`Unhandled Prisma error code [${exception.code}]: ${exception.message}`);
      Sentry.captureException(exception);
      throw exception;
    }

    this.domainFilter.catch(translated, host);
  }

  private translate(exception: Prisma.PrismaClientKnownRequestError): DomainException | null {
    switch (exception.code) {
      case 'P2002': {
        const target = this.extractUniqueTarget(exception);
        return new UniqueConstraintViolationException(target);
      }
      case 'P2025': {
        return new RecordNotFoundException();
      }
      default:
        return null;
    }
  }

  private extractUniqueTarget(exception: Prisma.PrismaClientKnownRequestError): string {
    const meta = exception.meta as { target?: string[] | string } | undefined;
    if (!meta?.target) {
      return 'field';
    }
    if (Array.isArray(meta.target)) {
      return meta.target.join(', ');
    }
    return meta.target;
  }
}
