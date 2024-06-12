
import { PaymentMethodType } from '@domain/accounts/payment-method-type.enum';
import { PaymentMethod } from '@domain/accounts/payment-method.entity';
import { ApiProperty } from '@nestjs/swagger';

export class PaymentMethodEntryDto {
  @ApiProperty({
    description: 'Payment method type',
    enum: PaymentMethodType,
    type: PaymentMethodType,
  })
  paymentMethodType: PaymentMethodType;

  @ApiProperty({
    description: 'Identification Key',
    type: 'string',
  })
  identificationKey: string;

  @ApiProperty({
    description: 'Extra Info',
    type: 'string',
  })
  extraInfo: string;

  toEntity(): PaymentMethod {
    return new PaymentMethod(this);
  }
}

export class PaymentMethodDto extends PaymentMethodEntryDto {
  constructor(partial: Partial<PaymentMethodDto>) {
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

  static fromEntity(address: PaymentMethod): PaymentMethodDto {
    return new PaymentMethodDto({
      paymentMethodType: address.paymentMethodType,
      identificationKey: address.identificationKey,
      extraInfo: address.extraInfo,
      createdAt: address.createdAt,
      updatedAt: address.updatedAt,
    });
  }
}
