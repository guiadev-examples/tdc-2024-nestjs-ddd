import {
  BaseSequencialIDEntity,
  PublishableIdMixin,
  TimestampableMixin,
} from '@infra/database/base.entities';
import { ArrayMinSize } from 'class-validator';
import { Column, Entity, OneToMany} from 'typeorm';
import { OrderItem } from './order-item.entity';
import { Customer, Address } from '@integration/accounts/customer.interface';

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

  @Column({ type: 'jsonb', nullable: false })
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
