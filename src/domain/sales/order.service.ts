import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transactional } from 'typeorm-transactional';
import { Order } from './order.entity';
import { Customer, CustomerProvider, CustomerService } from '@integration/accounts/customer.interface';


@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly repository: Repository<Order>,
    @Inject(CustomerProvider)
    private readonly customerService: CustomerService,
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

    const customer: Customer = await this.customerService.getCustomer('1234567890');
    order.purchasingCustomer = customer;

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
