import { Module } from '@nestjs/common';
import { InfraModule } from '@infra/infra.module';
import { IntegrationModule } from '@integration/integration.module';
import { DomainModule } from '@domain/domain.module';
import { ApplicationModule } from './application/application.module';

@Module({
  imports: [InfraModule, IntegrationModule, DomainModule, ApplicationModule],
})
export class AppModule {}
