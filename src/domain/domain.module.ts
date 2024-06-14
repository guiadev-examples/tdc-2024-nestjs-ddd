import { Module } from '@nestjs/common';
import { SalesContextModule } from './sales/sales.module';

@Module({
  imports: [    
    SalesContextModule,    
  ],
})
export class DomainModule {}
