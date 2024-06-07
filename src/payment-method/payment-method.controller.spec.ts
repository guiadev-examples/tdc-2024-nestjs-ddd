import { Test, TestingModule } from '@nestjs/testing';
import { PaymentMethodController } from './payment-method.controller';
import { PaymentMethodService } from './payment-method.service';

describe('PaymentMethodController', () => {
  let controller: PaymentMethodController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentMethodController],
      providers: [PaymentMethodService],
    }).compile();

    controller = module.get<PaymentMethodController>(PaymentMethodController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
