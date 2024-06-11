import {
  BaseSequencialIDEntity,
  PublishableIdMixin,
  TimestampableMixin,
} from '@infra/database/base.entities';
import { ArrayMinSize } from 'class-validator';
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { OrderItem } from './order-item.entity';
import { Customer } from '@domain/accounts/customer.entity';
import { Address } from '@domain/accounts/address.entity';

@Entity({
  name: 'orders',
})
export class Order extends PublishableIdMixin(
  TimestampableMixin(BaseSequencialIDEntity),
) {
  constructor(partial?: Partial<Order>) {
    super();
    Object.assign(this, partial);
  }

  @OneToOne(
    () => Customer,    
  )
  @JoinColumn({
    name: 'purchasing_customer_id',
  })
  purchasingCustomer: Customer;
  
  @Column({ type: 'jsonb', nullable: false })
  deliveryAddress: Address;

  @Column({ type: 'jsonb' })
  billingAddress: Address;

  @OneToMany(() => OrderItem, (item) => item.order, {
    cascade: ['insert'],
  })
  @ArrayMinSize(1)
  items: OrderItem[];
}
