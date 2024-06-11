import {
  BaseSequencialIDEntity,
  PublishableIdMixin,
  TimestampableMixin,
} from '@infra/database/base.entities';
import { IsNotEmpty } from 'class-validator';
import { Column, Entity } from 'typeorm';


@Entity({
  name: 'manufacturers',
})
export class Manufacturer extends PublishableIdMixin(
  TimestampableMixin(BaseSequencialIDEntity),
) {
  constructor(partial?: Partial<Manufacturer>) {
    super();
    Object.assign(this, partial);
  }

  @Column()
  @IsNotEmpty()
  name: string;

}
