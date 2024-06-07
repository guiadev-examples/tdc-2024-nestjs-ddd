import { Test, TestingModule } from '@nestjs/testing';
import { DeliveryAddressService } from './delivery-address.service';

describe('DeliveryAddressService', () => {
  let service: DeliveryAddressService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeliveryAddressService],
    }).compile();

    service = module.get<DeliveryAddressService>(DeliveryAddressService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
