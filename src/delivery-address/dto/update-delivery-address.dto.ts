import { PartialType } from '@nestjs/mapped-types';
import { CreateDeliveryAddressDto } from './create-delivery-address.dto';

export class UpdateDeliveryAddressDto extends PartialType(CreateDeliveryAddressDto) {}
