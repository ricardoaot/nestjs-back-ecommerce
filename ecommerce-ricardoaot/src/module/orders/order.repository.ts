import { Injectable } from "@nestjs/common";
import { Order } from "./order.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class OrdersRepository {

    constructor(
        @InjectRepository(Order) private readonly ordersRepository: Repository<Order>
    ) {}

    async getOrder(id: string, limit: number, page: number): Promise<Order[]> {
        /*
            Busca una orden recibida por id.

            Devuelve un objeto con la orden y los detalles de la orden (el detalle de la orden debe contener un array con todos los productos adquiridos).
        */
        const result = await this.ordersRepository.find({
            where: {id},
            skip: (page - 1) * limit,
            take: limit
        });  

        return result
    }
    
    async addOrder(order: Partial<Order>): Promise<Order> {
        /*
            Busca a un usuario por id.

            Crea un registro en la tabla orders con el usuario encontrado.

            Busca los productos por id recibidos en la request actualizando el total de la compra y reduciendo el stock del producto. correspondiente. (al realizar la búsqueda de todos los productos aquellos con stock igual a 0 no deben ser mostrados).

            Construye y registra un detalle de compra con los productos seleccionados.

            Devuelve la orden de compra con el precio y id del detalle de compra.
        */ 
        const result = await this.ordersRepository.save(order);
        return result;
    }   
}