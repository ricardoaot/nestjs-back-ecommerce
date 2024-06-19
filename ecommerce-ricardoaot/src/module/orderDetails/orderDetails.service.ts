import { Injectable } from "@nestjs/common";
import { OrderDetail } from "./orderDetail.entity";
import { OrderDetailsRepository } from "./orderDetails.repository";

@Injectable()
export class OrderDetailsService {
    constructor(
        private readonly orderDetailsRepository: OrderDetailsRepository
    ) {}

    async getOrderDetails(limit: number, page: number): Promise<OrderDetail[]> {
        return await this.orderDetailsRepository.getOrderDetails(limit, page);
    }
}