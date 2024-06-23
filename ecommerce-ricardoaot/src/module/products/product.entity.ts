import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from 'uuid';
import { OrderDetail } from "../orderDetails/orderDetail.entity";

@Entity({
    name: 'products'
})

export class Product {
    @PrimaryGeneratedColumn('uuid')
    id:string = uuid();

    @Column({
        length: 50
    })
    name: string
    
    @Column()
    description: string
    
    @Column('decimal', { precision: 10, scale: 2 })
    price: number
    
    @Column()
    stock: number
    
    @Column({ default: 'http://defaultImageUrl.com' })
    imgUrl: string

    @ManyToMany(() => OrderDetail, (orderDetail) => orderDetail.products)
    orderDetails: OrderDetail[]
}