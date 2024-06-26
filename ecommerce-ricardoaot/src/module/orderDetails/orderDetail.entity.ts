import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToMany, OneToMany, ManyToOne, OneToOne, JoinTable } from "typeorm";
import { v4 as uuid } from 'uuid';
import { Product } from "../products/product.entity";

@Entity({
    name: 'orderDetails'
})  

export class OrderDetail {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid();

    @Column('decimal', { precision: 10, scale: 2 })
    price: number;

    @ManyToMany(() => Product)
    @JoinTable()
    products: Product[]

}