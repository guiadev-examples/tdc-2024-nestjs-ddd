import { PartialType } from '@nestjs/mapped-types';
import { CreatePurchasingCustomerDto } from './create-purchasing-customer.dto';

export class UpdatePurchasingCustomerDto extends PartialType(CreatePurchasingCustomerDto) {}
