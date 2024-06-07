import { Injectable } from '@nestjs/common';
import { CreatePurchasingCustomerDto } from './dto/create-purchasing-customer.dto';
import { UpdatePurchasingCustomerDto } from './dto/update-purchasing-customer.dto';

@Injectable()
export class PurchasingCustomerService {
  create(createPurchasingCustomerDto: CreatePurchasingCustomerDto) {
    return 'This action adds a new purchasingCustomer';
  }

  findAll() {
    return `This action returns all purchasingCustomer`;
  }

  findOne(id: number) {
    return `This action returns a #${id} purchasingCustomer`;
  }

  update(id: number, updatePurchasingCustomerDto: UpdatePurchasingCustomerDto) {
    return `This action updates a #${id} purchasingCustomer`;
  }

  remove(id: number) {
    return `This action removes a #${id} purchasingCustomer`;
  }
}
