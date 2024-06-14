import { Routes } from '@nestjs/core';
import { SalesModule } from './sales/sales.module';
import { OrderReviewModule } from './order-review/order-review.module';

export const routes: Routes = [

      {
        path: '/sales',
        module: SalesModule,
      },

      {
        path: '/order-review',
        module: OrderReviewModule,
      },
];
