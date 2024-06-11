import { Module } from '@nestjs/common';
import { Customer } from './customer.entity';
import { Address } from './address.entity';
import { PaymentMethod } from './payment-method.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerService } from './customer.service';

@Module({
  imports: [TypeOrmModule.forFeature([Customer, Address, PaymentMethod])],
  providers: [CustomerService],
  exports: [CustomerService],
})
export class AccountsModule {}
