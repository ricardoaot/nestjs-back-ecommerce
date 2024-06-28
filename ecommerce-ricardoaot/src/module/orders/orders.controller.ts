import { Controller, Get, Post, Param, Body, Query, Res, ParseUUIDPipe, BadRequestException } from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { Order } from "./order.entity";
import { Response } from "express";
import { CreateOrderDto } from "./orders.dto";
@Controller('orders')
export class OrdersController {
    constructor(
        private readonly ordersService: OrdersService
    ){}

    @Get(':id')
    async getOrder(
        @Param('id', ParseUUIDPipe) id: string, 
        @Query('limit') limit: number, 
        @Query('page') page: number, 
        @Res() response: Response
    ){
        try{
            const result = await this.ordersService.getOrder(id, limit, page);
            return response.status(200).send(result);
        }catch(error) {
            throw new BadRequestException(error.message);
        }

    }

    @Post('/')
    async addOrder(@Body() order: CreateOrderDto, @Res() response: Response){
        try{
            const result = await this.ordersService.addOrder(order);
            return response.status(201).send(result);                
        }catch(error) {
            throw new BadRequestException(error.message);
        }
    }
}