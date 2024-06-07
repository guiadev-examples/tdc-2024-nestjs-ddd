import { Test, TestingModule } from '@nestjs/testing';
import { PurchasingCustomerController } from './purchasing-customer.controller';
import { PurchasingCustomerService } from './purchasing-customer.service';

describe('PurchasingCustomerController', () => {
  let controller: PurchasingCustomerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PurchasingCustomerController],
      providers: [PurchasingCustomerService],
    }).compile();

    controller = module.get<PurchasingCustomerController>(PurchasingCustomerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
