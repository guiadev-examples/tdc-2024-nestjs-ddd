import { Module } from '@nestjs/common';
import { BillingAddressService } from './billing-address.service';
import { BillingAddressController } from './billing-address.controller';

@Module({
  controllers: [BillingAddressController],
  providers: [BillingAddressService],
})
export class BillingAddressModule {}
