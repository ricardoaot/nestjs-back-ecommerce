import { Controller, Get, Post, Param, Body, Query, Res } from "@nestjs/common";
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
    async getOrder(@Param('id') id: string, @Query('limit') limit: number, @Query('page') page: number, @Res() response: Response){
        const result = await this.ordersService.getOrder(id, limit, page);
        return response.status(200).send(result);
    }

    @Post('/')
    async addOrder(@Body() order: CreateOrderDto, @Res() response: Response){
        const result = await this.ordersService.addOrder(order);
        return response.status(201).send(result);
    }
}