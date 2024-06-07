import { PartialType } from '@nestjs/mapped-types';
import { CreateBillingAddressDto } from './create-billing-address.dto';

export class UpdateBillingAddressDto extends PartialType(CreateBillingAddressDto) {}
