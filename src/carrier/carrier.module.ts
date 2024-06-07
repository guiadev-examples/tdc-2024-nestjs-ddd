import { Module } from '@nestjs/common';
import { CarrierService } from './carrier.service';
import { CarrierController } from './carrier.controller';

@Module({
  controllers: [CarrierController],
  providers: [CarrierService],
})
export class CarrierModule {}
