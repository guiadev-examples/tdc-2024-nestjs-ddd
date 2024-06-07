import { Injectable } from '@nestjs/common';
import { CreateCarrierDto } from './dto/create-carrier.dto';
import { UpdateCarrierDto } from './dto/update-carrier.dto';

@Injectable()
export class CarrierService {
  create(createCarrierDto: CreateCarrierDto) {
    return 'This action adds a new carrier';
  }

  findAll() {
    return `This action returns all carrier`;
  }

  findOne(id: number) {
    return `This action returns a #${id} carrier`;
  }

  update(id: number, updateCarrierDto: UpdateCarrierDto) {
    return `This action updates a #${id} carrier`;
  }

  remove(id: number) {
    return `This action removes a #${id} carrier`;
  }
}
