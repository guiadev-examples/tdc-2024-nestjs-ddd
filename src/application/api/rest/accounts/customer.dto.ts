import { Customer } from '@domain/accounts/customer.entity';
import { ApiProperty } from '@nestjs/swagger';
import { AddressDto, AddressEntryDto } from './address.dto';
import { PaymentMethodDto, PaymentMethodEntryDto } from './payment-method.dto';

export class CustomerEntryDto {
  @ApiProperty({
    description: 'Customer name',
    type: 'string',
  })
  name: string;

  @ApiProperty({
    description: 'Social Identification',
    type: 'string',
  })
  socialIdentification: string;

  @ApiProperty({
    description: 'Addresses',
    type: AddressEntryDto,
    isArray: true,
  })
  addresses: AddressEntryDto[];

  @ApiProperty({
    description: 'Payment Methods',
    type: PaymentMethodEntryDto,
    isArray: true,
  })
  paymentMethods: PaymentMethodEntryDto[];

  toEntity(): Customer {
    return new Customer({
      name: this.name,
      socialIdentification: this.socialIdentification,  
      addresses: this.addresses.map((address) => address.toEntity()),
      paymentMethods: this.paymentMethods.map((paymentMethod) => paymentMethod.toEntity()),
    });
  }
}

export class CustomerDto extends CustomerEntryDto {
  constructor(partial: Partial<CustomerDto>) {
    super();
    Object.assign(this, partial);
  }

  @ApiProperty({
    description: 'Plubic id',
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

  static fromEntity(customer: Customer): CustomerDto {
    return new CustomerDto({
      publicId: customer.publicId,
      name: customer.name,
      socialIdentification: customer.socialIdentification,
      addresses: customer.addresses?.map((address) => AddressDto.fromEntity(address)),
      paymentMethods: customer.paymentMethods?.map((paymentMethod) => PaymentMethodDto.fromEntity(paymentMethod)),
      createdAt: customer.createdAt,
      updatedAt: customer.updatedAt,
    });
  }
}
