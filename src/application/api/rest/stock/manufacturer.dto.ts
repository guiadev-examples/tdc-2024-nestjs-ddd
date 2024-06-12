
import { Manufacturer } from '@domain/stock/manufacturer.entity';
import { ApiProperty } from '@nestjs/swagger';

export class ManufacturerEntryDto {
  @ApiProperty({
    description: 'Name',
    type: 'string',
  })
  name: string;

  toEntity(): Manufacturer {
    return new Manufacturer(this);
  }
}

export class ManufacturerDto extends ManufacturerEntryDto {
  constructor(partial: Partial<ManufacturerDto>) {
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

  static fromEntity(manufacturer: Manufacturer): ManufacturerDto {
    return new ManufacturerDto({
      publicId: manufacturer.publicId,
      name: manufacturer.name,
      createdAt: manufacturer.createdAt,
      updatedAt: manufacturer.updatedAt,
    });
  }
}
