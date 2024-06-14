import {
  BaseSequencialIDEntity,
  TimestampableMixin,
} from '@infra/database/base.entities';
import { IsNotEmpty } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { Order } from './order.entity';
import { Product } from './sold-product.entity';

@Entity({
  name: 'order_items',
})
export class OrderItem extends TimestampableMixin(BaseSequencialIDEntity) {
  constructor(partial?: Partial<OrderItem>) {
    super();
    Object.assign(this, partial);
  }

  @Column({ type: 'jsonb', nullable: false })
  soldProduct: Product;

  @Column()
  @IsNotEmpty()
  quantity: number;

  @OneToOne(
    () => Product,    
  )
  @JoinColumn({
    name: 'sold_product_id',
  })
  productReference: Product;

  @ManyToOne(() => Order, (order) => order.items)
  @JoinColumn({
    name: 'order_id',
  })
  order: Order;
}
