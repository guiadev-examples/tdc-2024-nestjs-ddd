import { Test, TestingModule } from '@nestjs/testing';
import { PurchasingCustomerService } from './purchasing-customer.service';

describe('PurchasingCustomerService', () => {
  let service: PurchasingCustomerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PurchasingCustomerService],
    }).compile();

    service = module.get<PurchasingCustomerService>(PurchasingCustomerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
