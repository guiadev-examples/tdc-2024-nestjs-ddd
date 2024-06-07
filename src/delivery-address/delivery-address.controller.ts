import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DeliveryAddressService } from './delivery-address.service';
import { CreateDeliveryAddressDto } from './dto/create-delivery-address.dto';
import { UpdateDeliveryAddressDto } from './dto/update-delivery-address.dto';

@Controller('delivery-address')
export class DeliveryAddressController {
  constructor(private readonly deliveryAddressService: DeliveryAddressService) {}

  @Post()
  create(@Body() createDeliveryAddressDto: CreateDeliveryAddressDto) {
    return this.deliveryAddressService.create(createDeliveryAddressDto);
  }

  @Get()
  findAll() {
    return this.deliveryAddressService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.deliveryAddressService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDeliveryAddressDto: UpdateDeliveryAddressDto) {
    return this.deliveryAddressService.update(+id, updateDeliveryAddressDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deliveryAddressService.remove(+id);
  }
}
