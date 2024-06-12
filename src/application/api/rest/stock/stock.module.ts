import { StockContextModule } from '@domain/stock/stock.module';
import { Module, forwardRef } from '@nestjs/common';
import { ProductController } from './product.controller';

@Module({
    imports: [forwardRef(() => StockContextModule)],
    controllers: [ProductController],
})
export class StockModule {}
