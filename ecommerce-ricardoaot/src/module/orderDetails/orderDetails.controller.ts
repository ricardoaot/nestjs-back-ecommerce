import { Controller, Get, Query, Res } from "@nestjs/common";
import { OrderDetailsService } from "./orderDetails.service";
import { Response } from "express";
@Controller('orderDetails')
export class OrderDetailsController {
    constructor(
        private readonly orderDetailsService: OrderDetailsService
    ){}
    @Get("/")
    async getOrderDetails(
        @Query('limit') limit: number, 
        @Query('page') page: number, 
        @Res() res: Response
    ){
        return await this.orderDetailsService.getOrderDetails(
            limit, page
        );
    }
}