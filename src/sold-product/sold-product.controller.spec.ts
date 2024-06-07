import { Test, TestingModule } from '@nestjs/testing';
import { SoldProductController } from './sold-product.controller';
import { SoldProductService } from './sold-product.service';

describe('SoldProductController', () => {
  let controller: SoldProductController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SoldProductController],
      providers: [SoldProductService],
    }).compile();

    controller = module.get<SoldProductController>(SoldProductController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
