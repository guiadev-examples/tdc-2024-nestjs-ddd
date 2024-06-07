import { Injectable } from '@nestjs/common';
import { CreateDeliveryItemDto } from './dto/create-delivery-item.dto';
import { UpdateDeliveryItemDto } from './dto/update-delivery-item.dto';

@Injectable()
export class DeliveryItemService {
  create(createDeliveryItemDto: CreateDeliveryItemDto) {
    return 'This action adds a new deliveryItem';
  }

  findAll() {
    return `This action returns all deliveryItem`;
  }

  findOne(id: number) {
    return `This action returns a #${id} deliveryItem`;
  }

  update(id: number, updateDeliveryItemDto: UpdateDeliveryItemDto) {
    return `This action updates a #${id} deliveryItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} deliveryItem`;
  }
}
