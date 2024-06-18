import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, OneToMany, ManyToOne } from "typeorm";
import { v4 as uuid } from 'uuid';
import { Order } from "src/module/orders/order.entity";

@Entity({
    name: 'orderDetails'
})  

export class OrderDetail {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid();

    @Column()
    price: number;

    @Column()
    order_id: string

    @ManyToOne(
        () => Order, 
        (order) => order.orderDetails)
    order: Order
    
}