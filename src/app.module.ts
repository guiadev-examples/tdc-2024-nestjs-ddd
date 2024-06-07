import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerModule } from './customer/customer.module';
import { AddressModule } from './address/address.module';
import { PaymentMethodModule } from './payment-method/payment-method.module';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { ManufacturerModule } from './manufacturer/manufacturer.module';
import { SupplierModule } from './supplier/supplier.module';
import { OrderModule } from './order/order.module';
import { OrderItemModule } from './order-item/order-item.module';
import { BillingAddressModule } from './billing-address/billing-address.module';
import { SoldProductModule } from './sold-product/sold-product.module';
import { DeliveryAddressModule } from './delivery-address/delivery-address.module';
import { DeliveryItemModule } from './delivery-item/delivery-item.module';
import { PackageModule } from './package/package.module';
import { CarrierModule } from './carrier/carrier.module';
import { InvoiceModule } from './invoice/invoice.module';
import { InvoiceItemModule } from './invoice-item/invoice-item.module';
import { PaymentModule } from './payment/payment.module';
import { PurchasingCustomerModule } from './purchasing-customer/purchasing-customer.module';

@Module({
  imports: [CustomerModule, AddressModule, PaymentMethodModule, ProductModule, CategoryModule, ManufacturerModule, SupplierModule, OrderModule, OrderItemModule, BillingAddressModule, SoldProductModule, DeliveryAddressModule, DeliveryItemModule, PackageModule, CarrierModule, InvoiceModule, InvoiceItemModule, PaymentModule, PurchasingCustomerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
