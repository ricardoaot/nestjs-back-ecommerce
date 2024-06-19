import { Injectable } from "@nestjs/common";
import { Order } from "./order.entity";
import { OrdersRepository } from "./order.repository";
import { OrderDetailsRepository } from "../orderDetails/orderDetails.repository";
import { UsersRepository } from "../users/users.repository";
import { ProductsRepository } from "../products/products.repository";
import { CreateOrderDto, CreatedOrderResultDto } from "./orders.dto";
import typeormDT from "../../config/typeorm";

@Injectable()
export class OrdersService {
    constructor(
        private readonly usersRepository: UsersRepository,
        private readonly ordersRepository: OrdersRepository,
        private readonly orderDetailsRepository: OrderDetailsRepository,
        private readonly productsRepository: ProductsRepository,
    ) {}
    async getOrder(id: string, limit: number, page: number): Promise<Order[]> {
        return await this.ordersRepository.getOrder(id, limit, page);
    }


    async addOrder(
        order: CreateOrderDto
    ): Promise<any> {

         //get user
        const foundUser = await this.usersRepository.getUserById(order.userId);
        
        if(!foundUser) return {message: "User not found"}; // User not found

        //add order header
        const newOrder = await this.ordersRepository.addOrder({userId:order.userId});
        const idNewOrder = newOrder.id;        
        
        //add order details
        const newOrderDetails = order.products.map(
            async product => {
                //get product
                const foundProduct = await this.productsRepository.getProductById(product.id)
                const product_price = foundProduct.price

                console.log(product_price)

                if(!product_price) return {message: "Product without price"}; // Product not found

                //insert order item
                const orderDetail = await this.orderDetailsRepository.addOrderDetail(
                    {
                        price: product_price, 
                        order: newOrder,
                        product: foundProduct
                    }
                );
                return {...orderDetail}
            }
        )

        const result = this.getOrder(idNewOrder,null, null)
        return result
    }
}