import { Controller, Post, Get, Body, Res, Delete, BadRequestException } from "@nestjs/common";
import { CategoriesService } from "./categories.service";
import { CategoriesSeeder } from "./categories.seeder";
import { Category } from "./category.entity";
import { Response } from "express";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
    constructor(
        private readonly categoriesService: CategoriesService,
        private readonly categoriesSeeder: CategoriesSeeder
    ) {}

    @Post('/seeder')
    async seedCategories() {
        try{
            return await this.categoriesSeeder.seedCategories()
        }catch(error) {
            throw new BadRequestException(error.message);
        }
    }

    @Get('/')
    async getCategories(
        @Res() response: Response  
    ) {
        try{
            const result = await this.categoriesService.getCategories()
            return response.status(200).send(result)    
        }catch(error) {
            throw new BadRequestException(error.message);
        }
    }

    @Post('/')
    async addCategory(
        @Body() category: Omit<Category, 'id'>,
        @Res() response: Response
    ) {
        try{
            const result = await this.categoriesService.addCategory(category)
            return response.status(201).send(result)    
        }catch(error) {
            throw new BadRequestException(error.message);
        }
    }

}    