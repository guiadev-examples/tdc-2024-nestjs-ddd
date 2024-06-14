import { Module } from '@nestjs/common';
import { OrderReviewController } from './processor.controller';

@Module({
  controllers: [OrderReviewController],
})
export class OrderReviewModule {}
