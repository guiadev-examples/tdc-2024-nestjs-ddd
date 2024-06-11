import { Public } from '@infra/auth/public.decorator';
import {
  EventBusProvider,
  EventBusService,
} from '@infra/event/event-bus/event-bus.interface';
import { Controller, Get, Inject } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import {
  HealthCheck,
  HealthCheckService,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';

@Controller('health')
@ApiExcludeController()
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private db: TypeOrmHealthIndicator,
    @Inject(EventBusProvider)
    private eventBusService: EventBusService,
  ) {}

  @Get()
  @Public()
  @HealthCheck()
  check() {
    return this.health.check([
      () => this.db.pingCheck('database'),
      () => this.eventBusService.pingCheck(),
    ]);
  }
}
