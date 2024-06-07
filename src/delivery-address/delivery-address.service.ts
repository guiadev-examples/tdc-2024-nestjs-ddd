import { Injectable } from '@nestjs/common';
import { CreateDeliveryAddressDto } from './dto/create-delivery-address.dto';
import { UpdateDeliveryAddressDto } from './dto/update-delivery-address.dto';

@Injectable()
export class DeliveryAddressService {
  create(createDeliveryAddressDto: CreateDeliveryAddressDto) {
    return 'This action adds a new deliveryAddress';
  }

  findAll() {
    return `This action returns all deliveryAddress`;
  }

  findOne(id: number) {
    return `This action returns a #${id} deliveryAddress`;
  }

  update(id: number, updateDeliveryAddressDto: UpdateDeliveryAddressDto) {
    return `This action updates a #${id} deliveryAddress`;
  }

  remove(id: number) {
    return `This action removes a #${id} deliveryAddress`;
  }
}
