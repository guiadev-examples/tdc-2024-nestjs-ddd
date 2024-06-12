import {
  BaseSequencialIDEntity,
  PublishableIdMixin,
  TimestampableMixin,
} from '@infra/database/base.entities';
import { IsNotEmpty } from 'class-validator';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { Manufacturer } from './manufacturer.entity';
import { Supplier } from './supplier.entity';
import { Category } from './category.entity';


@Entity({
  name: 'products',
})
export class Product extends PublishableIdMixin(
  TimestampableMixin(BaseSequencialIDEntity),
) {
  constructor(partial?: Partial<Product>) {
    super();
    Object.assign(this, partial);
  }

  @Column()
  @IsNotEmpty()
  name: string;

  @Column()
  @IsNotEmpty()
  description: string;

  @Column()
  @IsNotEmpty()
  stockQuantity: number;

  @Column()
  @IsNotEmpty()
  price: number;

  @OneToOne(
    () => Manufacturer,    
  )
  @JoinColumn({
    name: 'category_id',
  })
  category: Category;

  @OneToOne(
    () => Manufacturer,    
  )
  @JoinColumn({
    name: 'manufacturer_id',
  })
  manufacturer: Manufacturer;

  @OneToOne(
    () => Supplier,    
  )
  @JoinColumn({
    name: 'supplier_id',
  })
  supplier: Supplier;
}
