import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Supplier } from './supplier.entity';
import { Manufacturer } from './manufacturer.entity';
import { Category } from './category.entity';
import { ProductService } from './product.service';

@Module({
    imports: [TypeOrmModule.forFeature([Product, Supplier, Manufacturer, Category])],
    providers: [ProductService],
    exports: [ProductService],
})
export class StockModule {}
