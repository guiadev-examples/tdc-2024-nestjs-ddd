
import { Address } from '@domain/accounts/address.entity';
import { ApiProperty } from '@nestjs/swagger';

export class AddressEntryDto {
  @ApiProperty({
    description: 'Street',
    type: 'string',
  })
  street: string;

  @ApiProperty({
    description: 'City',
    type: 'string',
  })
  city: string;

  @ApiProperty({
    description: 'State',
    type: 'string',
  })
  state: string;

  @ApiProperty({
    description: 'Country',
    type: 'string',
  })
  country: string;

  @ApiProperty({
    description: 'Postal Code',
    type: 'string',
  })
  postalCode: string;

  toEntity(): Address {
    return new Address(this);
  }
}

export class AddressDto extends AddressEntryDto {
  constructor(partial: Partial<AddressDto>) {
    super();
    Object.assign(this, partial);
  }

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

  static fromEntity(address: Address): AddressDto {
    return new AddressDto({
      street: address.street,
      city: address.city,
      state: address.state,
      country: address.country,
      postalCode: address.postalCode,
      createdAt: address.createdAt,
      updatedAt: address.updatedAt,
    });
  }
}
