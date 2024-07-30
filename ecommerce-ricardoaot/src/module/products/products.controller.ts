import { BadRequestException, Body, Controller, Delete, Get, HttpCode, Param, ParseUUIDPipe, Post, Put, Query, Req, Res, UseGuards } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { ProductsDBService } from "./products.DB.service";
import { Request, Response, response } from "express";
import { Product } from "./product.entity";
import { AuthGuard } from "../../guards/auth.guards";
import { ProductsSeeder } from "./products.seeder";
import { RolesGuard } from "../../guards/roles.guards";
import { Roles } from "../../decorators/roles.decorator";
import { RolesEnum } from "../users/enum/roles.enum";
import { ApiTags, ApiBearerAuth, ApiQuery } from "@nestjs/swagger";
import { NewProductDTO } from "./dto/newProduct.dto";
import { UpdateProductDTO } from "./dto/updateProduct.dto";

@ApiTags('Products')
@Controller('products')
export class ProductsController {
    constructor( 
        private readonly productsService: ProductsService,
        private readonly productsDBService: ProductsDBService,
        private readonly productsSeeder: ProductsSeeder
    ){}

    @Get('/')
    @ApiQuery({ name: 'limit', required: false, description: 'Number of elements per page', schema: { default: 20 } })
    @ApiQuery({ name: 'page', required: false, description: 'Page number', schema: { default: 1 } })
    async getProducts(
        @Query('limit') limit: number = 5, 
        @Query('page') page: number = 1, 
        @Res() response: Response
    ){
        try{
            const result = await this.productsDBService.getProducts(limit, page);
            return response.status(200).send(result);                 
        }catch(error) {
            throw new BadRequestException(error.message);
        }
    }
    @Get(':id')
    async getProductById(
        @Param('id', ParseUUIDPipe) id: string, 
        @Res() response: Response
    ){
        try{
            const result = await this.productsService.getProductById(id);
            return response.status(200).send(result);    
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
    async createProducts(
        @Body() product: NewProductDTO, 
        @Res() response: Response
    ){
        try{
            console.log(product);
            const id = await this.productsService.createProduct(product);
            return response.status(201).send({message: 'Product created', id});                
        }catch(error) {
            throw new BadRequestException(error.message);
        }
    }

    @Post('/seeder')
    async seedProducts(){
        try{
            return await this.productsSeeder.seedProducts();            
        }catch(error) {
            throw new BadRequestException(error.message);
        }
    }
    
    @Put(':id')
    @Roles(RolesEnum.Admin)
    @UseGuards(
        AuthGuard,
        RolesGuard
    )
    @ApiBearerAuth()
    async updateProducts(
        @Body() product: UpdateProductDTO, 
        @Param('id', ParseUUIDPipe) id: string, 
        @Res() response: Response
    ){
        try{
            const result = await this.productsService.updateProduct(product, id);
            return response.status(200).send({message: 'Product updated', id:result});    
        }catch(error) {
            throw new BadRequestException(error.message);
        }
    }

    @Delete(':id')
    @Roles(RolesEnum.Admin)
    @UseGuards(
        AuthGuard,
        RolesGuard
    )
    @ApiBearerAuth()
    async deleteProducts(
        @Param('id', ParseUUIDPipe) id:string, 
        @Res() response: Response
    ){
        try{
            const result = await this.productsService.deleteProduct(id);
            return response.status(200).send({message: 'Product deleted', id:result});    
        }catch(error) {
            throw new BadRequestException(error.message);
        }
    }

}