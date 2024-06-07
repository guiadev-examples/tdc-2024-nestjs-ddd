import { Test, TestingModule } from '@nestjs/testing';
import { BillingAddressService } from './billing-address.service';

describe('BillingAddressService', () => {
  let service: BillingAddressService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BillingAddressService],
    }).compile();

    service = module.get<BillingAddressService>(BillingAddressService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
