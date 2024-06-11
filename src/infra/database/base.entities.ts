import {
  Column,
  CreateDateColumn,
  Generated,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class BaseEntity {}

export abstract class BaseSequencialIDEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
}

export abstract class BaseUUIDEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
}

export function TimestampableMixin(Base: any) {
  abstract class Timestampable extends Base {
    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
  }
  return Timestampable;
}

export function PublishableIdMixin(Base: any) {
  abstract class PublishableId extends Base {
    @Column({ name: 'public_id', unique: true })
    @Generated('uuid')
    publicId: string;
  }
  return PublishableId;
}
