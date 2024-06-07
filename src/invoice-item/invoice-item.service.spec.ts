import { Test, TestingModule } from '@nestjs/testing';
import { InvoiceItemService } from './invoice-item.service';

describe('InvoiceItemService', () => {
  let service: InvoiceItemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InvoiceItemService],
    }).compile();

    service = module.get<InvoiceItemService>(InvoiceItemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
