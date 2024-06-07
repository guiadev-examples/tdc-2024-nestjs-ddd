import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InvoiceItemService } from './invoice-item.service';
import { CreateInvoiceItemDto } from './dto/create-invoice-item.dto';
import { UpdateInvoiceItemDto } from './dto/update-invoice-item.dto';

@Controller('invoice-item')
export class InvoiceItemController {
  constructor(private readonly invoiceItemService: InvoiceItemService) {}

  @Post()
  create(@Body() createInvoiceItemDto: CreateInvoiceItemDto) {
    return this.invoiceItemService.create(createInvoiceItemDto);
  }

  @Get()
  findAll() {
    return this.invoiceItemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.invoiceItemService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInvoiceItemDto: UpdateInvoiceItemDto) {
    return this.invoiceItemService.update(+id, updateInvoiceItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.invoiceItemService.remove(+id);
  }
}
