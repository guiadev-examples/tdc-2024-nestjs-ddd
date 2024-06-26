import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transactional } from 'typeorm-transactional';
import { Order } from './order.entity';


@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly repository: Repository<Order>,
  ) {}

  async findAll(): Promise<Order[]> {
    return this.repository.find();
  }

  async findByPublicId(publicId: string): Promise<Order> {
    return this.repository.findOneOrFail({
      where: { publicId: publicId },
    });
  }

  @Transactional()
  async create(order: Order): Promise<Order> {
    return this.repository.save(order);
  }

  @Transactional()
  async update(publicId: string, orderPartial: Order): Promise<Order> {
    const order = await this.findByPublicId(publicId);
    order.assign(this, orderPartial);    
    return this.repository.save(order);
  }

  @Transactional()
  async remove(publicId: string) {
    const order = await this.findByPublicId(publicId);
    return this.repository.delete(order.id);
  }
}
