import { Module, forwardRef } from '@nestjs/common';
import { SalesContextModule } from './sales/sales.module';
import { CustomerModule } from '@integration/accounts/customer.module';

@Module({
  imports: [    
    SalesContextModule,
    forwardRef(() => CustomerModule)
  ],
})
export class DomainModule {}
