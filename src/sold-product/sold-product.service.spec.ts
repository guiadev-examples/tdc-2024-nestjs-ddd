import { Test, TestingModule } from '@nestjs/testing';
import { SoldProductService } from './sold-product.service';

describe('SoldProductService', () => {
  let service: SoldProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SoldProductService],
    }).compile();

    service = module.get<SoldProductService>(SoldProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
