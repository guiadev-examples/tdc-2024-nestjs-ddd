import { Module } from '@nestjs/common';
import { CustomerProvider } from './customer.interface';
import { AccountsHttpRestService } from './provider/accounts-http-rest.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [
    {
      provide: CustomerProvider,
      useClass: AccountsHttpRestService,
    },
  ],
  exports: [CustomerProvider],
})
export class CustomerModule {}
