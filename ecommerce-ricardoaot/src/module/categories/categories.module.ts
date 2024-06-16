import { Module } from "@nestjs/common";
import { Category } from "./category.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoriesController } from "./categories.controller";
import { CategoriesSeeder } from "./categories.seeder";
import { CategoriesService } from "./categories.service";

@Module({
    imports: [TypeOrmModule.forFeature([Category])],
    controllers: [CategoriesController],
    providers: [CategoriesSeeder, CategoriesService],
})
export class CategoriesModule {}