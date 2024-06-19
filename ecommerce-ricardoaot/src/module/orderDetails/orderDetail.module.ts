import { Module } from "@nestjs/common";
import { OrderDetailsController } from "./orderDetails.controller";
import { OrderDetailsService } from "./orderDetails.service";
import { OrderDetailsRepository } from "./orderDetails.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrderDetail } from "./orderDetail.entity";

@Module({
    imports: [ TypeOrmModule.forFeature([OrderDetail])],
    controllers: [ OrderDetailsController],
    providers: [OrderDetailsService, OrderDetailsRepository],
    exports: []
})
export class OrderDetailsModule {}