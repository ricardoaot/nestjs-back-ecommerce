import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { LoggerMiddleware } from "src/middlewares/logger.middleware";
import { UsersRepository } from "./users.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { Order } from "../orders/order.entity";
import { OrdersRepository } from "../orders/order.repository";

@Module({
    imports: [TypeOrmModule.forFeature([User])],   
    controllers: [UsersController], 
    providers: [
        UsersService, 
        UsersRepository
    ]
})
export class UsersModule 
    implements NestModule{
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes('users');
    }
}