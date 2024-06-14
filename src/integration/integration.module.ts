import { Module } from '@nestjs/common';
import { PostalCodeModule } from './postal-code/postal-code.module';

@Module({
  imports: [PostalCodeModule],
})
export class IntegrationModule {}
