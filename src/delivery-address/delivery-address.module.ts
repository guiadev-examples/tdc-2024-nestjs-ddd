import { Module } from '@nestjs/common';
import { DeliveryAddressService } from './delivery-address.service';
import { DeliveryAddressController } from './delivery-address.controller';

@Module({
  controllers: [DeliveryAddressController],
  providers: [DeliveryAddressService],
})
export class DeliveryAddressModule {}
