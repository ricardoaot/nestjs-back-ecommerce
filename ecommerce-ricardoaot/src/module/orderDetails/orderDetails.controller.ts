import { BadRequestException, Controller, Get, Param, ParseUUIDPipe, Query, Res, UseGuards } from "@nestjs/common";
import { OrderDetailsService } from "./orderDetails.service";
import { Response } from "express";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "../../guards/auth.guards";

@ApiTags('Order Details')
@Controller('orderDetails')
export class OrderDetailsController {
    constructor(
        private readonly orderDetailsService: OrderDetailsService
    ){}

    @Get("/:id")
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    async getOrderDetails(
        @Param('id', ParseUUIDPipe) id: string, 
        @Res() response: Response
    ){
        try{
            const result = await this.orderDetailsService.getOrderDetails(id);
            return response.status(200).send(result);
        }catch(error) {
            throw new BadRequestException(error.message);
        }
    }
}