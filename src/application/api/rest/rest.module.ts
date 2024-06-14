import { AppController } from './app.controller';
import { RouterModule } from '@nestjs/core';
import { routes } from './routes';
import { Module } from '@nestjs/common';
import { SalesModule } from './sales/sales.module';
import { OrderReviewModule } from './order-review/order-review.module';

@Module({
  imports: [RouterModule.register(routes), SalesModule, OrderReviewModule],
  controllers: [AppController],
})
export class RestModule {}
