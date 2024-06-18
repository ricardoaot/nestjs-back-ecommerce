import { Injectable } from "@nestjs/common";
import { Order } from "./order.entity";
import { OrdersRepository } from "./order.repository";
import { OrderDetailsRepository } from "../orderDetails/orderDetails.repository";
import { UsersRepository } from "../users/users.repository";
import { ProductsRepository } from "../products/products.repository";
import { CreateOrderDto, CreatedOrderResultDto } from "./orders.dto";
@Injectable()
export class OrdersService {
    constructor(
        private readonly usersRepository: UsersRepository,
        private readonly ordersRepository: OrdersRepository,
        private readonly orderDetailsRepository: OrderDetailsRepository,
        private readonly productsRepository: ProductsRepository
    ) {}
    async getOrder(id: string, limit: number, page: number): Promise<Order[]> {
        return await this.ordersRepository.getOrder(id, limit, page);
    }
    async addOrder(
        order: CreateOrderDto //: Omit<Order, 'id, date'>
    ): Promise<any> {
        const result = []
        //get user
        const foundUser = await this.usersRepository.getUserById(order.userId);
        if(!foundUser) return undefined; // User not found

        //add order header
        const newOrder = await this.ordersRepository.addOrder({userId:order.userId});
        const idNewOrder = newOrder.id;

        //add order details
        const newOrderDetails = order.products.map(
            async product => {
                //get product
                const product_price = await this.productsRepository.getProductById(product.id).then(product => product.price)
                if(!product_price) return undefined; // Product not found

                //insert order item
                const orderDetail = await this.orderDetailsRepository.addOrderDetail(
                    {
                        price: product_price, 
                        order_id: idNewOrder
                    }
                );
                return {...orderDetail}
            }
        )

        const newOrderDetails_result = await Promise.all(newOrderDetails) 
        result.push(idNewOrder, newOrderDetails_result)  
        return result
    }
}