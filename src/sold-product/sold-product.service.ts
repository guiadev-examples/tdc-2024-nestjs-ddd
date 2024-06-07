import { Injectable } from '@nestjs/common';
import { CreateSoldProductDto } from './dto/create-sold-product.dto';
import { UpdateSoldProductDto } from './dto/update-sold-product.dto';

@Injectable()
export class SoldProductService {
  create(createSoldProductDto: CreateSoldProductDto) {
    return 'This action adds a new soldProduct';
  }

  findAll() {
    return `This action returns all soldProduct`;
  }

  findOne(id: number) {
    return `This action returns a #${id} soldProduct`;
  }

  update(id: number, updateSoldProductDto: UpdateSoldProductDto) {
    return `This action updates a #${id} soldProduct`;
  }

  remove(id: number) {
    return `This action removes a #${id} soldProduct`;
  }
}
