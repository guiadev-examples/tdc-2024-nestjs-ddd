
import { Supplier } from '@domain/stock/supplier.entity';
import { ApiProperty } from '@nestjs/swagger';

export class SupplierEntryDto {
  @ApiProperty({
    description: 'Name',
    type: 'string',
  })
  name: string;

  toEntity(): Supplier {
    return new Supplier(this);
  }
}

export class SupplierDto extends SupplierEntryDto {
  constructor(partial: Partial<SupplierDto>) {
    super();
    Object.assign(this, partial);
  }

  @ApiProperty({
    description: 'Public Id',
    type: 'string',
  })
  publicId: string;

  @ApiProperty({
    description: 'Creation Date',
    type: Date,
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Last update date',
    type: Date,
  })
  updatedAt: Date;

  static fromEntity(supplier: Supplier): SupplierDto {
    return new SupplierDto({
      publicId: supplier.publicId,
      name: supplier.name,
      createdAt: supplier.createdAt,
      updatedAt: supplier.updatedAt,
    });
  }
}
