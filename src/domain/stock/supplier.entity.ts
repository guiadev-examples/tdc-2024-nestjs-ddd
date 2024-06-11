import {
  BaseSequencialIDEntity,
  PublishableIdMixin,
  TimestampableMixin,
} from '@infra/database/base.entities';
import { IsNotEmpty } from 'class-validator';
import { Column, Entity } from 'typeorm';


@Entity({
  name: 'suppliers',
})
export class Supplier extends PublishableIdMixin(
  TimestampableMixin(BaseSequencialIDEntity),
) {
  constructor(partial?: Partial<Supplier>) {
    super();
    Object.assign(this, partial);
  }

  @Column()
  @IsNotEmpty()
  name: string;

}
