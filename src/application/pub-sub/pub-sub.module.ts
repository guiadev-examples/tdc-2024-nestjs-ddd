import { Module, forwardRef } from '@nestjs/common';
import { EventBusModule } from '@infra/event/event-bus/event-bus.module';

@Module({
  imports: [forwardRef(() => EventBusModule)],
})
export class PubSubModule {}
