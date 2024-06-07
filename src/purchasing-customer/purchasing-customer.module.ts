import { Module } from '@nestjs/common';
import { PurchasingCustomerService } from './purchasing-customer.service';
import { PurchasingCustomerController } from './purchasing-customer.controller';

@Module({
  controllers: [PurchasingCustomerController],
  providers: [PurchasingCustomerService],
})
export class PurchasingCustomerModule {}
