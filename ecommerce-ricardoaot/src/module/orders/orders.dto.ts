import { ArrayMinSize, IsArray, IsNotEmpty, IsString, IsUUID, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { PartialType } from "@nestjs/mapped-types";
import { Product } from "../products/product.entity";

/*
class OrderItemDto {
    id: string; //product id
}
*/

class OrderItemDto extends PartialType(Product) {}

export class CreateOrderDto {
    @IsNotEmpty()
    @IsUUID()
    userId: string;

    @IsArray()
    @ValidateNested({ each: true })
    @ArrayMinSize(1, {message: 'The order must have at least one product'})
    @Type(() => OrderItemDto)
    products: OrderItemDto[];
}


class OrderItemResultDto {
    id: string;
    price: number;
}
export class CreatedOrderResultDto {
    id: string;
    date: Date;
    orderDetails: OrderItemResultDto[]
}