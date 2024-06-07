import { PartialType } from '@nestjs/mapped-types';
import { CreateInvoiceItemDto } from './create-invoice-item.dto';

export class UpdateInvoiceItemDto extends PartialType(CreateInvoiceItemDto) {}
