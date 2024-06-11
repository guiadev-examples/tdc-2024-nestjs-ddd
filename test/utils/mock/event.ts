import { TestingModule } from '@nestjs/testing';
import { EventEmitter2 } from 'eventemitter2';

export function spyEventPublisher(module: TestingModule) {
  const eventEmitter: EventEmitter2 = module.get(EventEmitter2);

  return jest.spyOn(eventEmitter, 'emit');
}
