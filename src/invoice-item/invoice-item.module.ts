import { Module } from '@nestjs/common';
import { InvoiceItemService } from './invoice-item.service';
import { InvoiceItemController } from './invoice-item.controller';

@Module({
  controllers: [InvoiceItemController],
  providers: [InvoiceItemService],
})
export class InvoiceItemModule {}
