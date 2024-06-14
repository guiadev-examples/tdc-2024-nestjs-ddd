import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transactional } from 'typeorm-transactional';
import { Customer } from './customer.entity';
import { PostalCodeProvider, PostalCodeService } from '@integration/postal-code/postal-code.interface';
import { BusinessError } from '@infra/errors/business.error';
import { DomainEventPublisher } from '@infra/event/event-publisher.decorator';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly repository: Repository<Customer>,
    @Inject(PostalCodeProvider)
    private readonly postalCodeService: PostalCodeService,
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
  @DomainEventPublisher("customer.created")
  async create(customer: Customer): Promise<Customer> {

    this.populateAddressByZipCode(customer);

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

  private async populateAddressByZipCode(customer: Customer) {
    try {

      customer.addresses?.forEach(async (address) => {
        const capturedAddress = await this.postalCodeService.getAddressByZipCode(
          address.postalCode,
        );
        capturedAddress.street = capturedAddress.street;
        capturedAddress.city = capturedAddress.city;
        capturedAddress.state = capturedAddress.state;
        capturedAddress.district = capturedAddress.district;
      });      
    } catch (error) {
      if (error.message.startsWith('Invalid postal code')) {
        throw new BusinessError(error.message);
      }

      if (error.message.startsWith('Postal code not found')) {
        throw new BusinessError(error.message);
      }

      throw error;
    }
  }
}
