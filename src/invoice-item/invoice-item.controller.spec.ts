import { Test, TestingModule } from '@nestjs/testing';
import { InvoiceItemController } from './invoice-item.controller';
import { InvoiceItemService } from './invoice-item.service';

describe('InvoiceItemController', () => {
  let controller: InvoiceItemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InvoiceItemController],
      providers: [InvoiceItemService],
    }).compile();

    controller = module.get<InvoiceItemController>(InvoiceItemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
