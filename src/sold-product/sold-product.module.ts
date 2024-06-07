import { Module } from '@nestjs/common';
import { SoldProductService } from './sold-product.service';
import { SoldProductController } from './sold-product.controller';

@Module({
  controllers: [SoldProductController],
  providers: [SoldProductService],
})
export class SoldProductModule {}
