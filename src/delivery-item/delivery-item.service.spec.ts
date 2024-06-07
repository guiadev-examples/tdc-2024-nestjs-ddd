import { Test, TestingModule } from '@nestjs/testing';
import { DeliveryItemService } from './delivery-item.service';

describe('DeliveryItemService', () => {
  let service: DeliveryItemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeliveryItemService],
    }).compile();

    service = module.get<DeliveryItemService>(DeliveryItemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
