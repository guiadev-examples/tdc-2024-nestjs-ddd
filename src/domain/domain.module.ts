import { Module } from '@nestjs/common';
import { AccountsContextModule } from './accounts/accounts.module';
import { StockContextModule } from './stock/stock.module';
import { SalesContextModule } from './sales/sales.module';
import { ShippingContextModule } from './shipping/shipping.module';
import { BillingContextModule } from './billing/billing.module';

@Module({
  imports: [
    AccountsContextModule,
    StockContextModule,
    SalesContextModule,
    ShippingContextModule,
    BillingContextModule,
  ],
})
export class DomainModule {}
