import { Injectable } from "@nestjs/common";
import { OrderDetail } from "./orderDetail.entity";
import { OrderDetailsRepository } from "./orderDetails.repository";

@Injectable()
export class OrderDetailsService {
    constructor(
        private readonly orderDetailsRepository: OrderDetailsRepository
    ) {}

    async getOrderDetails(id: string): Promise<OrderDetail[]> {
        return await this.orderDetailsRepository.getOrderDetails(id);
    }
}