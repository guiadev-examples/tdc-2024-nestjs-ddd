import {
  BaseSequencialIDEntity,
  PublishableIdMixin,
  TimestampableMixin,
} from '@infra/database/base.entities';
import { IsNotEmpty } from 'class-validator';
import { Column, Entity } from 'typeorm';


@Entity({
  name: 'categories',
})
export class Category extends PublishableIdMixin(
  TimestampableMixin(BaseSequencialIDEntity),
) {
  constructor(partial?: Partial<Category>) {
    super();
    Object.assign(this, partial);
  }

  @Column()
  @IsNotEmpty()
  name: string;

}
