import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DeliveryItemService } from './delivery-item.service';
import { CreateDeliveryItemDto } from './dto/create-delivery-item.dto';
import { UpdateDeliveryItemDto } from './dto/update-delivery-item.dto';

@Controller('delivery-item')
export class DeliveryItemController {
  constructor(private readonly deliveryItemService: DeliveryItemService) {}

  @Post()
  create(@Body() createDeliveryItemDto: CreateDeliveryItemDto) {
    return this.deliveryItemService.create(createDeliveryItemDto);
  }

  @Get()
  findAll() {
    return this.deliveryItemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.deliveryItemService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDeliveryItemDto: UpdateDeliveryItemDto) {
    return this.deliveryItemService.update(+id, updateDeliveryItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deliveryItemService.remove(+id);
  }
}
