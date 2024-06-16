import { Module } from "@nestjs/common";
import { ProductsController } from "./products.controller";
import { ProductsService } from "./products.service";
import { ProductsRepository } from "./products.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "./product.entity";
import { ProductsDBService } from "./products.DB.service";
import { ProductsSeeder } from "./products.seeder";

@Module({
    imports: [TypeOrmModule.forFeature([Product])],
    controllers: [ProductsController],
    providers: [
        ProductsService, 
        ProductsDBService, 
        ProductsSeeder, 
        ProductsRepository
    ],
})
export class ProductsModule {}