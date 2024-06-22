import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToMany, OneToMany, ManyToOne, OneToOne, JoinTable } from "typeorm";
import { v4 as uuid } from 'uuid';
import { Order } from "src/module/orders/order.entity";
import { Product } from "src/module/products/product.entity";

@Entity({
    name: 'orderDetails'
})  

export class OrderDetail {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid();

    @Column('decimal', { precision: 10, scale: 2 })
    price: number;

    //@OneToOne(()=> Order)
    //@JoinColumn()
    //order: Order

    @ManyToMany(() => Product)
    @JoinTable()
    products: Product[]

/*    
    @ManyToOne(
        () => Order, 
        (order) => order.orderDetails)
    order: Order

    @OneToOne(()=> Product)
    @JoinColumn()
    product: Product
*/  

}