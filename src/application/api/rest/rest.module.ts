import { AppController } from './app.controller';
import { RouterModule } from '@nestjs/core';
import { routes } from './routes';
import { Module } from '@nestjs/common';
import { AccountsModule } from './accounts/accounts.module';
import { StockModule } from './stock/stock.module';
import { SalesModule } from './sales/sales.module';

@Module({
  imports: [RouterModule.register(routes), AccountsModule, StockModule, SalesModule],
  controllers: [AppController],
})
export class RestModule {}
