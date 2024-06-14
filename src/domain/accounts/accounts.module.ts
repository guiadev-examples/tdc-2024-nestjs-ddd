import { Module, forwardRef } from '@nestjs/common';
import { Customer } from './customer.entity';
import { Address } from './address.entity';
import { PaymentMethod } from './payment-method.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerService } from './customer.service';
import { PostalCodeModule } from '@integration/postal-code/postal-code.module';

@Module({
  imports: [TypeOrmModule.forFeature([Customer, Address, PaymentMethod]), forwardRef(() => PostalCodeModule)],
  providers: [CustomerService],
  exports: [CustomerService],
})
export class AccountsContextModule {}
