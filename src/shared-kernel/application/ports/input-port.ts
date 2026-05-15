/**
 * InputPort — Primitiva genérica para los Input Ports de Uncle Bob.
 *
 * Un Input Port es la interfaz que define UN caso de uso concreto: una
 * operación con su entrada (TInput), su salida exitosa (TOutput) y la
 * familia de errores de dominio que puede producir (DomainException).
 *
 * Cada feature del proyecto define su propio Input Port extendiendo o
 * usando esta primitiva. Por ejemplo, en el módulo IAM:
 *
 *   export interface CreateAdvisorInputPort
 *     extends InputPort<CreateAdvisorInput, CreateAdvisorOutput> {}
 *
 * El Interactor concreto implementa esa interfaz. El Controller depende
 * SOLO de la interfaz, nunca del Interactor, gracias a inyección por
 * Symbol tokens (TypeScript no tiene reflection en runtime).
 *
 * Decisión de diseño: el error está fijado a DomainException. Los errores
 * inesperados (fallos de infraestructura, bugs) NO viajan por Result;
 * suben como excepciones hasta el DomainExceptionFilter en presentation.
 *
 * → CAPA: Use Cases (Uncle Bob)
 * → DIAGRAMA DE COMPONENTES: cada Input Port es un puerto de entrada
 *   del bounded context al que pertenece.
 * → DIAGRAMA DE SECUENCIA: Controller → InputPort → Interactor.
 */

import { DomainException } from '../../domain/exceptions/domain.exception';
import { Result } from '../../domain/result';

export interface InputPort<TInput, TOutput> {
  execute(input: TInput): Promise<Result<TOutput, DomainException>>;
}
