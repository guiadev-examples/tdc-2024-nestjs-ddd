import { Injectable } from '@nestjs/common';
import { CreateInvoiceItemDto } from './dto/create-invoice-item.dto';
import { UpdateInvoiceItemDto } from './dto/update-invoice-item.dto';

@Injectable()
export class InvoiceItemService {
  create(createInvoiceItemDto: CreateInvoiceItemDto) {
    return 'This action adds a new invoiceItem';
  }

  findAll() {
    return `This action returns all invoiceItem`;
  }

  findOne(id: number) {
    return `This action returns a #${id} invoiceItem`;
  }

  update(id: number, updateInvoiceItemDto: UpdateInvoiceItemDto) {
    return `This action updates a #${id} invoiceItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} invoiceItem`;
  }
}
