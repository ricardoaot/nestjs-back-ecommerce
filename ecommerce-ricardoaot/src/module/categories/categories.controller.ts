import { Controller, Post, Get, Body, Res, Delete, BadRequestException, UseGuards } from "@nestjs/common";
import { CategoriesService } from "./categories.service";
import { CategoriesSeeder } from "./categories.seeder";
import { Response } from "express";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { NewCategoryDTO } from "./dto/newCategory.dto";
import { Roles } from "src/decorators/roles.decorator";
import { RolesEnum } from "../../module/users/enum/roles.enum";
import { AuthGuard } from "../../guards/auth.guards";
import { RolesGuard } from "../../guards/roles.guards";

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
    @Roles(RolesEnum.Admin)
    @UseGuards(
        AuthGuard,
        RolesGuard
    )
    @ApiBearerAuth()
    async addCategory(
        @Body() category: NewCategoryDTO,
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