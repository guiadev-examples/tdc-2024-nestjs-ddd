import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { EventBusModule } from './event-bus/event-bus.module';

@Module({
  imports: [EventEmitterModule.forRoot(), EventBusModule],
})
export class EventModule {}
