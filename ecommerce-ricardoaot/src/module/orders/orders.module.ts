import { Module } from "@nestjs/common";
import { OrdersController } from "./orders.controller";
import { OrdersService } from "./orders.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Order } from "./order.entity";
import { OrderDetail } from "../orderDetails/orderDetail.entity";
import { Product } from "../products/product.entity";
import { User } from "../users/user.entity";

import { OrdersRepository } from "./order.repository";
import { UsersRepository } from "../users/users.repository";
import { OrderDetailsRepository } from "../orderDetails/orderDetails.repository";
import { ProductsRepository } from "../products/products.repository";

@Module({
    imports: [TypeOrmModule.forFeature([Order, OrderDetail, Product, User])],
    controllers: [OrdersController],    
    providers: [
        OrdersService, 
        OrdersRepository,
        OrderDetailsRepository,
        ProductsRepository,
        UsersRepository
    ], 
    exports: []
})
export class OrdersModule {}