import { Routes } from '@nestjs/core';
import { AccountsModule } from './accounts/accounts.module';
import { StockModule } from './stock/stock.module';
import { SalesModule } from './sales/sales.module';

export const routes: Routes = [
    {
        path: '/accounts',
        module: AccountsModule,
      },
      {
        path: '/stock',
        module: StockModule,
      },
      {
        path: '/sales',
        module: SalesModule,
      },
];
