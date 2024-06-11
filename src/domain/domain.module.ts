import { Module } from '@nestjs/common';
import { AccountsModule } from './accounts/accounts.module';
import { StockModule } from './stock/stock.module';
import { SalesModule } from './sales/sales.module';
import { ShippingModule } from './shipping/shipping.module';
import { BillingModule } from './billing/billing.module';

@Module({
  imports: [
    AccountsModule,
    StockModule,
    SalesModule,
    ShippingModule,
    BillingModule,
  ],
})
export class DomainModule {}
