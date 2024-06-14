import { Inject } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

export const DomainEventPublisher = (eventName: string): MethodDecorator => {
  const injectEventEmitter = Inject(EventEmitter2);

  return (
    target: Record<string, unknown>,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor,
  ) => {
    const originalMethod = descriptor.value;
    injectEventEmitter(target, 'eventEmitter');

    descriptor.value = function (...args) {
      const result = originalMethod.apply(this, args);

      result
        .then((data) => {
          const eventEmitter: EventEmitter2 = this.eventEmitter;
          eventEmitter.emit(eventName, data);
        })
        .catch(() => undefined);

      return result;
    };
    return descriptor;
  };
};
