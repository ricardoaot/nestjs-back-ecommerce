class OrderItemDto {
    id: string; //product id
}

export class CreateOrderDto {
    userId: string;
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