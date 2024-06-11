import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transactional } from 'typeorm-transactional';
import { OrderItem } from './order-item.entity';


@Injectable()
export class OrderItemService {
  constructor(
    @InjectRepository(OrderItem)
    private readonly repository: Repository<OrderItem>,
  ) {}

  async findByPublicId(publicId: string): Promise<OrderItem> {
    return this.repository.findOneOrFail({
      where: { publicId: publicId },
    });
  }

  @Transactional()
  async create(orderItem: OrderItem): Promise<OrderItem> {
    return this.repository.save(orderItem);
  }

  @Transactional()
  async update(publicId: string, orderItemPartial: OrderItem): Promise<OrderItem> {
    const orderItem = await this.findByPublicId(publicId);
    orderItem.assign(this, orderItemPartial);    
    return this.repository.save(orderItem);
  }

  @Transactional()
  async remove(publicId: string) {
    const orderItem = await this.findByPublicId(publicId);
    return this.repository.delete(orderItem.id);
  }
}
