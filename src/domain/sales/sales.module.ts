import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { OrderItem } from './order-item.entity';
import { OrderService } from './order.service';
import { OrderItemService } from './order-item.service';

@Module({
    imports: [TypeOrmModule.forFeature([Order, OrderItem])],
    providers: [OrderService, OrderItemService],
    exports: [OrderService, OrderItemService],
})
export class SalesContextModule {}
