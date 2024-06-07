import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BillingAddressService } from './billing-address.service';
import { CreateBillingAddressDto } from './dto/create-billing-address.dto';
import { UpdateBillingAddressDto } from './dto/update-billing-address.dto';

@Controller('billing-address')
export class BillingAddressController {
  constructor(private readonly billingAddressService: BillingAddressService) {}

  @Post()
  create(@Body() createBillingAddressDto: CreateBillingAddressDto) {
    return this.billingAddressService.create(createBillingAddressDto);
  }

  @Get()
  findAll() {
    return this.billingAddressService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.billingAddressService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBillingAddressDto: UpdateBillingAddressDto) {
    return this.billingAddressService.update(+id, updateBillingAddressDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.billingAddressService.remove(+id);
  }
}
