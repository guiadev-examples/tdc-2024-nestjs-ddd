import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transactional } from 'typeorm-transactional';
import { Customer } from './customer.entity';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly repository: Repository<Customer>,
  ) {}

  async findAll(): Promise<Customer[]> {
    return this.repository.find();
  }

  async findByPublicId(publicId: string): Promise<Customer> {
    return this.repository.findOneOrFail({
      where: { publicId: publicId },
    });
  }

  @Transactional()
  async create(customer: Customer): Promise<Customer> {
    return this.repository.save(customer);
  }

  @Transactional()
  async update(publicId: string, name: string): Promise<Customer> {
    const customer = await this.findByPublicId(publicId);
    customer.name = name;
    return this.repository.save(customer);
  }

  @Transactional()
  async remove(publicId: string) {
    const customer = await this.findByPublicId(publicId);
    return this.repository.delete(customer.id);
  }
}
