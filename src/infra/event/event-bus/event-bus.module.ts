import { Module } from '@nestjs/common';
import { EventBusProvider } from './event-bus.interface';
import { AwsEventBusService } from './providers/aws-event-bus.service';

@Module({
  providers: [
    {
      provide: EventBusProvider,
      useClass: AwsEventBusService,
    },
  ],
  exports: [EventBusProvider],
})
export class EventBusModule {}
