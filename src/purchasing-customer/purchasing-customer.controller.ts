import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PurchasingCustomerService } from './purchasing-customer.service';
import { CreatePurchasingCustomerDto } from './dto/create-purchasing-customer.dto';
import { UpdatePurchasingCustomerDto } from './dto/update-purchasing-customer.dto';

@Controller('purchasing-customer')
export class PurchasingCustomerController {
  constructor(private readonly purchasingCustomerService: PurchasingCustomerService) {}

  @Post()
  create(@Body() createPurchasingCustomerDto: CreatePurchasingCustomerDto) {
    return this.purchasingCustomerService.create(createPurchasingCustomerDto);
  }

  @Get()
  findAll() {
    return this.purchasingCustomerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.purchasingCustomerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePurchasingCustomerDto: UpdatePurchasingCustomerDto) {
    return this.purchasingCustomerService.update(+id, updatePurchasingCustomerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.purchasingCustomerService.remove(+id);
  }
}
