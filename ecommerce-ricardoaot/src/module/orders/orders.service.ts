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
        private readonly productsRepository: ProductsRepository,
    ) {}

    async getOrder(
        id: string, limit: number, page: number
    ): Promise<Order[]> {
        const result = await this.ordersRepository.getOrder(id, limit, page);
        return result
    }

    async addOrder(
        order: CreateOrderDto
    ): Promise<any> {

        //get user
        const foundUser = await this.usersRepository.getUserById(order.userId);
        if(!foundUser) return {message: "User not found"}; // User not found

        // Prepare array of products 
        let total_product_price = 0
        const arrayFoundProducts = []

        for(let product of order.products) {
        
                //get product
                const foundProduct = await this.productsRepository.getProductById(product.id)
                if(foundProduct.stock>0) {
                    console.log("foundProduct ",foundProduct)
                    arrayFoundProducts.push(foundProduct)
                    
                    //Calculate total price
                    const product_price = foundProduct.price
                    if(!product_price) return {message: "Product without price"}; // Product not found
                    total_product_price += Number(product_price)

                    //Update stock
                    foundProduct.stock -=  1
                    await this.productsRepository.updateProduct(foundProduct, foundProduct.id)                    
                }
        }
    
        //add order details
        const newOrderDetails = await this.orderDetailsRepository.addOrderDetail(
            {
                price: total_product_price, 
                //order: newOrder,
                products: arrayFoundProducts
            }
        );
        
        //add order header
        const newOrder = await this.ordersRepository.addOrder(
            {
                user:foundUser, 
                orderDetails:newOrderDetails
            }
        );
        const idNewOrder = newOrder.id;

        console.log("Id new order", idNewOrder)

        const result = this.getOrder(idNewOrder,null, null)
        return result
    }
}