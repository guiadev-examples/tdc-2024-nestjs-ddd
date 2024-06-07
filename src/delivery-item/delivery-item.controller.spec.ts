import { Test, TestingModule } from '@nestjs/testing';
import { DeliveryItemController } from './delivery-item.controller';
import { DeliveryItemService } from './delivery-item.service';

describe('DeliveryItemController', () => {
  let controller: DeliveryItemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeliveryItemController],
      providers: [DeliveryItemService],
    }).compile();

    controller = module.get<DeliveryItemController>(DeliveryItemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
