import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { OrderItem } from './order-item.entity';
import { OrderService } from './order.service';
import { OrderItemService } from './order-item.service';
import { CustomerModule } from '@integration/accounts/customer.module';
import { Product } from './sold-product.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Order, OrderItem, Product]), forwardRef(() => CustomerModule)],
    providers: [OrderService, OrderItemService],
    exports: [OrderService, OrderItemService],
})
export class SalesContextModule {}
