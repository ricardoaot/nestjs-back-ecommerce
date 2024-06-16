import { Controller, Post, Get, Body, Res, Delete } from "@nestjs/common";
import { CategoriesService } from "./categories.service";
import { CategoriesSeeder } from "./categories.seeder";
import { Category } from "./category.entity";
import { Response } from "express";

@Controller('categories')
export class CategoriesController {
    constructor(
        private readonly categoriesService: CategoriesService,
        private readonly categoriesSeeder: CategoriesSeeder
    ) {}

    @Post('/seeder')
    async seedCategories() {
        return await this.categoriesSeeder.seedCategories()
    }

    @Get('/')
    async getCategories(
        @Res() response: Response  
    ) {
        const result = await this.categoriesService.getCategories()
        return response.status(200).send(result)
    }

    @Post('/')
    async addCategory(
        @Body() category: Omit<Category, 'id'>,
        @Res() response: Response
    ) {
        const result = await this.categoriesService.addCategory(category)
        return response.status(201).send(result)
    }

}    