import { Module } from '@nestjs/common';
import { CustomerModule } from './accounts/customer.module';

@Module({
  imports: [CustomerModule],
})
export class IntegrationModule {}
