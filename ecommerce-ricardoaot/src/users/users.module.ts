import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { LoggerMiddleware } from "src/middlewares/logger.middleware";
import { UsersRepository } from "./users.repository";

@Module({   
    controllers: [UsersController], 
    providers: [UsersService, UsersRepository]
})
export class UsersModule implements NestModule{
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes('users');
    }
}