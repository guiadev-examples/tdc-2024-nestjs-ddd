import { Module } from '@nestjs/common';
import { ApiModule } from './api/api.module';
import { HealthModule } from './health/health.module';
import { PubSubModule } from './pub-sub/pub-sub.module';

@Module({
  imports: [ApiModule, HealthModule, PubSubModule],
})
export class ApplicationModule {}
