import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health.controller';
import { EventBusModule } from '@infra/event/event-bus/event-bus.module';

@Module({
  imports: [TerminusModule, EventBusModule],
  controllers: [HealthController],
})
export class HealthModule {}
