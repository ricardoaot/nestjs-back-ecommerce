import { BadRequestException, Body, Controller, Delete, Get, HttpCode, Param, ParseUUIDPipe, Post, Put, Query, Req, Res, UseGuards } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { ProductsDBService } from "./products.DB.service";
import { Request, Response, response } from "express";
import { Product } from "./product.entity";
import { AuthGuard } from "src/guards/auth.guards";
import { ProductsSeeder } from "./products.seeder";

@Controller('products')
export class ProductsController {
    constructor( 
        private readonly productsService: ProductsService,
        private readonly productsDBService: ProductsDBService,
        private readonly productsSeeder: ProductsSeeder
    ){}

    @Get('/')
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
    @UseGuards(AuthGuard)
    async createProducts(
        @Body() product:Omit<Product,'id'>, 
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
    @UseGuards(AuthGuard)
    async updateProducts(
        @Body() product: Product, 
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
    @UseGuards(AuthGuard)
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