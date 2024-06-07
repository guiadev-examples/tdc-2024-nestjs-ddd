import { Test, TestingModule } from '@nestjs/testing';
import { CarrierService } from './carrier.service';

describe('CarrierService', () => {
  let service: CarrierService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CarrierService],
    }).compile();

    service = module.get<CarrierService>(CarrierService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
