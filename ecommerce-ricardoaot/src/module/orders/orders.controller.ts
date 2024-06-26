import { Controller, Get, Post, Param, Body, Query, Res, ParseUUIDPipe, BadRequestException, UseGuards } from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { Order } from "./order.entity";
import { Response } from "express";
import { CreateOrderDto } from "./orders.dto";
import { AuthGuard } from "src/guards/auth.guards";

@Controller('orders')
export class OrdersController {
    constructor(
        private readonly ordersService: OrdersService
    ){}

    @Get(':id')
    @UseGuards(AuthGuard)
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
    @UseGuards(AuthGuard)
    async addOrder(@Body() order: CreateOrderDto, @Res() response: Response){
        try{
            const result = await this.ordersService.addOrder(order);
            return response.status(201).send(result);                
        }catch(error) {
            throw new BadRequestException(error.message);
        }
    }
}