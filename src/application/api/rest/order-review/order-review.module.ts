import { Module } from '@nestjs/common';
import { OrderReviewController } from './order-erview.controller';

@Module({
  controllers: [OrderReviewController],
})
export class OrderReviewModule {}
