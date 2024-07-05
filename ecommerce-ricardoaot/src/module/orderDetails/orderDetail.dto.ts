import { ApiProperty } from "@nestjs/swagger";
class OrderItemDto {
    id: string; //product id
}

export class CreateOrderDto {
    @ApiProperty({
        example: '7d0f4f16-a5b2-40c6-b677-f22574c020c4',
        description: 'UUID of the user',
    })
    userId: string;

    @ApiProperty({
        example: '[]',
        description: 'Array of order items',
    })
    products: OrderItemDto[];
}


class OrderItemResultDto {
    @ApiProperty({
        example: '7d0f4f16-a5b2-40c6-b677-f22574c020c4',
        description: 'UUID of the order',
    })
    id: string;
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