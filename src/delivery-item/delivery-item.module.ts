import { Module } from '@nestjs/common';
import { DeliveryItemService } from './delivery-item.service';
import { DeliveryItemController } from './delivery-item.controller';

@Module({
  controllers: [DeliveryItemController],
  providers: [DeliveryItemService],
})
export class DeliveryItemModule {}
