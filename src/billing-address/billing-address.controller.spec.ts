import { Test, TestingModule } from '@nestjs/testing';
import { BillingAddressController } from './billing-address.controller';
import { BillingAddressService } from './billing-address.service';

describe('BillingAddressController', () => {
  let controller: BillingAddressController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BillingAddressController],
      providers: [BillingAddressService],
    }).compile();

    controller = module.get<BillingAddressController>(BillingAddressController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
