import {
  BaseSequencialIDEntity,
  PublishableIdMixin,
  TimestampableMixin,
} from '@infra/database/base.entities';
import { ArrayMinSize, IsNotEmpty } from 'class-validator';
import { Column, Entity, OneToMany } from 'typeorm';
import { Address } from './address.entity';
import { PaymentMethod } from './payment-method.entity';

@Entity({
  name: 'customers',
})
export class Customer extends PublishableIdMixin(
  TimestampableMixin(BaseSequencialIDEntity),
) {
  constructor(partial?: Partial<Customer>) {
    super();
    Object.assign(this, partial);
  }

  @Column()
  @IsNotEmpty()
  name: string;

  @Column()
  @IsNotEmpty()
  socialIdentification: string;

  @OneToMany(() => Address, (address) => address.customer, {
    cascade: ['insert'],
  })
  @ArrayMinSize(1)
  addresses: Address[];

  @OneToMany(() => PaymentMethod, (paymentMethod) => paymentMethod.customer, {
    cascade: ['insert'],
  })
  @ArrayMinSize(1)
  paymentMethods: PaymentMethod[];
}
