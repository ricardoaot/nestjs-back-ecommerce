import { BadRequestException, Controller, Get, Query, Res } from "@nestjs/common";
import { OrderDetailsService } from "./orderDetails.service";
import { Response } from "express";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('Order Details')
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
        try{
            return await this.orderDetailsService.getOrderDetails(
                limit, page
            );
        }catch(error) {
            throw new BadRequestException(error.message);
        }
    }
}