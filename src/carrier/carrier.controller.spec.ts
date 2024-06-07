import { Test, TestingModule } from '@nestjs/testing';
import { CarrierController } from './carrier.controller';
import { CarrierService } from './carrier.service';

describe('CarrierController', () => {
  let controller: CarrierController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CarrierController],
      providers: [CarrierService],
    }).compile();

    controller = module.get<CarrierController>(CarrierController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
