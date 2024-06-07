import { Injectable } from '@nestjs/common';
import { CreateBillingAddressDto } from './dto/create-billing-address.dto';
import { UpdateBillingAddressDto } from './dto/update-billing-address.dto';

@Injectable()
export class BillingAddressService {
  create(createBillingAddressDto: CreateBillingAddressDto) {
    return 'This action adds a new billingAddress';
  }

  findAll() {
    return `This action returns all billingAddress`;
  }

  findOne(id: number) {
    return `This action returns a #${id} billingAddress`;
  }

  update(id: number, updateBillingAddressDto: UpdateBillingAddressDto) {
    return `This action updates a #${id} billingAddress`;
  }

  remove(id: number) {
    return `This action removes a #${id} billingAddress`;
  }
}
