import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query, Req, Res, UseGuards } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { Request, Response, response } from "express";
import { Product } from "./product.interface";
import { AuthGuard } from "src/guards/auth.guards";

@Controller('products')
export class ProductsController {
    constructor( private readonly productsService: ProductsService){}

    @Get('/')
    async getProducts(
        @Query('limit') limit: number = 5, 
        @Query('page') page: number = 1, 
        @Res() response: Response
    ){
        const result = await this.productsService.getProducts(limit, page);
        return response.status(200).send(result); 
    }
    @Get(':id')
    async getProductById(
        @Param('id') id: string, 
        @Res() response: Response
    ){
        const result = await this.productsService.getProductById(Number(id));
        return response.status(200).send(result);
    }

    @Post('/')
    @UseGuards(AuthGuard)
    async createProducts(
        @Body() product:Omit<Product,'id'>, 
        @Res() response: Response
    ){
        console.log(product);
        const id = await this.productsService.createProduct(product);
        return response.status(201).send({message: 'Product created', id});
    }

    //@HttpCode(200)
    @Put(':id')
    @UseGuards(AuthGuard)
    async updateProducts(
        @Body() product: Product, 
        @Param('id') id: string, 
        @Res() response: Response
    ){
        const result = await this.productsService.updateProduct(product, Number(id));
        return response.status(200).send({message: 'Product updated', id:result});
    }

    @Delete(':id')
    @UseGuards(AuthGuard)
    async deleteProducts(
        @Param('id') id:string, 
        @Res() response: Response
    ){
        const result = await this.productsService.deleteProduct(Number(id));
        return response.status(200).send({message: 'Product deleted', id:result});
    }

}