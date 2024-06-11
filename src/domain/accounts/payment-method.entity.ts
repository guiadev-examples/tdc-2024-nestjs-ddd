import {
  BaseSequencialIDEntity,
  TimestampableMixin,
} from '@infra/database/base.entities';
import { IsNotEmpty } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Customer } from './customer.entity';
import { PaymentMethodType } from './payment-method-type.enum';

@Entity({
  name: 'payment_methods',
})
export class PaymentMethod extends TimestampableMixin(BaseSequencialIDEntity) {
  constructor(partial?: Partial<PaymentMethod>) {
    super();
    Object.assign(this, partial);
  }

  @Column({
    enum: PaymentMethodType,
    type: 'enum',
  })
  @IsNotEmpty()
  paymentMethodType: PaymentMethodType;

  @Column()
  @IsNotEmpty()
  identificationKey: string;

  @Column('jsonb', { nullable: true })
  extraInfo: any;

  @ManyToOne(() => Customer, (customer) => customer.paymentMethods)
  @JoinColumn({
    name: 'customer_id',
  })
  customer: Customer;
}
