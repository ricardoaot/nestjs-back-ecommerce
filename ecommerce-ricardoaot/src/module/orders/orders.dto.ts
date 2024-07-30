import { ArrayMinSize, IsArray, IsNotEmpty, IsString, IsUUID, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { PartialType } from "@nestjs/mapped-types";
import { Product } from "../products/product.entity";
import { ApiProperty } from "@nestjs/swagger";


class OrderItemDto extends PartialType(Product) {}

export class CreateOrderDto {
    @ApiProperty({
        example: '7d0f4f16-a5b2-40c6-b677-f22574c020c4',
        description: 'UUID of the user',
    })
    @IsNotEmpty()
    @IsUUID()
    userId: string;


    @ApiProperty({
        example: '[{"id": "9z2f4f16-a5b2-40c6-b677-f22574c020c4"}]',
        description: 'Array of order items with products',
    })
    @IsArray()
    @ValidateNested({ each: true })
    @ArrayMinSize(1, {message: 'The order must have at least one product'})
    @Type(() => OrderItemDto)
    products: OrderItemDto[];
}


class OrderItemResultDto {
    @ApiProperty({
        example: '7d0f4f16-a5b2-40c6-b677-f22574c020c4',
        description: 'UUID of the order',
    })
    id: string;

    @ApiProperty({
        example: 10,
        description: 'Price of the product',
    })
    price: number;
}
export class CreatedOrderResultDto {
    @ApiProperty({
        example: '7d0f4f16-a5b2-40c6-b677-f22574c020c4',
        description: 'UUID of the order',
    })
    id: string;

    @ApiProperty({
        example: '2024-01-01',
        description: 'Order date',
    })
    date: Date;

    @ApiProperty({
        example: '[]',
        description: 'Array of order items',
    })
    orderDetails: OrderItemResultDto[]
}