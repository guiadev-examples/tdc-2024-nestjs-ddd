import { BusinessError } from '@infra/errors/business.error';
import { validateOrReject, ValidationError } from 'class-validator';
import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';
import { plainToInstance, ClassConstructor } from 'class-transformer';

@EventSubscriber()
export class ClassValidatorSubscriber implements EntitySubscriberInterface {
  async beforeInsert(event: InsertEvent<any>) {
    try {
      // Intermediate tables of many to many relationships don't have the entity mapped in the event
      if (event.entity) {
        const entity = plainToInstance(
          event.metadata.target as ClassConstructor<any>,
          event.entity,
        );

        await validateOrReject(entity);
      }
    } catch (errors) {
      if (errors instanceof Array) {
        this.handleValidationErrors(errors);
      }
      throw new BusinessError(errors);
    }
  }

  async beforeUpdate(event: UpdateEvent<any>) {
    try {
      if (event.entity) {
        const entity = plainToInstance(
          event.metadata.target as ClassConstructor<any>,
          event.entity,
        );

        await validateOrReject(entity);
      }
    } catch (errors) {
      if (errors instanceof Array) {
        this.handleValidationErrors(errors);
      }
      throw new BusinessError(errors);
    }
  }

  private handleValidationErrors(errors: ValidationError[]) {
    throw new BusinessError(
      errors.map((error) => this.getValidationMessage(error)).join(', '),
      errors.map((error) => this.getValidationKey(error)).join(', '),
    );
  }

  private getValidationKey(error: ValidationError) {
    const errorKeys: string[] = [];
    for (const constraint of this.getConstraints(error)) {
      const { reason } = constraint;
      errorKeys.push(
        `${error.target.constructor.name.toLowerCase()}.${
          error.property
        }.${reason}`,
      );
    }

    return errorKeys.join(', ');
  }

  private getValidationMessage(error: ValidationError) {
    const errorMessages: string[] = [];
    for (const constraint of this.getConstraints(error)) {
      const { message } = constraint;
      errorMessages.push(`${error.target.constructor.name}: ${message}`);
    }

    return errorMessages.join(', ');
  }

  private getConstraints(error: ValidationError) {
    const constraints: { reason: string; message: string }[] = [];
    if (error.constraints) {
      for (const constraint of Object.entries(error.constraints)) {
        const [reason, message] = constraint;
        constraints.push({ reason, message });
      }
    } else {
      (error?.children || []).forEach((childrenError) => {
        constraints.push(...this.getConstraints(childrenError));
      });
    }

    return constraints;
  }
}
