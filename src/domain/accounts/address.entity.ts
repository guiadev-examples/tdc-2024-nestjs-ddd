import {
  BaseSequencialIDEntity,
  TimestampableMixin,
} from '@infra/database/base.entities';
import { IsNotEmpty } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Customer } from './customer.entity';

@Entity({
  name: 'addresses',
})
export class Address extends TimestampableMixin(BaseSequencialIDEntity) {
  constructor(partial?: Partial<Address>) {
    super();
    Object.assign(this, partial);
  }

  @Column()
  @IsNotEmpty()
  street: string;

  @Column()
  @IsNotEmpty()
  city: string;

  @Column()
  @IsNotEmpty()
  state: string;

  @Column()
  @IsNotEmpty()
  country: string;

  @Column()
  @IsNotEmpty()
  postalCode: string;

  @ManyToOne(() => Customer, (customer) => customer.addresses)
  @JoinColumn({
    name: 'customer_id',
  })
  customer: Customer;
}
