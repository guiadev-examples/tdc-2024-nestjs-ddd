import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transactional } from 'typeorm-transactional';
import { Product } from './product.entity';


@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly repository: Repository<Product>,
  ) {}

  async findAll(): Promise<Product[]> {
    return this.repository.find();
  }

  async findByPublicId(publicId: string): Promise<Product> {
    return this.repository.findOneOrFail({
      where: { publicId: publicId },
    });
  }

  @Transactional()
  async create(product: Product): Promise<Product> {
    return this.repository.save(product);
  }

  @Transactional()
  async update(publicId: string, productPartial: Product): Promise<Product> {
    const product = await this.findByPublicId(publicId);
    product.assign(this, productPartial);    
    return this.repository.save(product);
  }

  @Transactional()
  async remove(publicId: string) {
    const product = await this.findByPublicId(publicId);
    return this.repository.delete(product.id);
  }
}
