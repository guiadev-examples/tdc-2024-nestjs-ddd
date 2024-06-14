import { Routes } from '@nestjs/core';
import { SalesModule } from './sales/sales.module';

export const routes: Routes = [

      {
        path: '/sales',
        module: SalesModule,
      },
];
