import { Injectable } from "@nestjs/common";
import { OrderDetail } from "./orderDetail.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class OrderDetailsRepository {
    constructor(
        @InjectRepository(OrderDetail) private orderDetailsRepository: Repository<OrderDetail>
    ){}
    async addOrderDetail(orderDetail: any): Promise<any> {
        return await this.orderDetailsRepository.save(orderDetail);
    }

    async getOrderDetails(
        id: string
    ): Promise <OrderDetail[]> {
        
        return await this.orderDetailsRepository.find({
            where: {id: id},
            relations: {
                products: true
            }
        })
    }
}