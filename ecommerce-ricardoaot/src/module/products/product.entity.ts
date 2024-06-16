import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from 'uuid';

@Entity({
    name: 'products'
})

export class Product {
    @PrimaryGeneratedColumn('uuid')
    id:string = uuid();

    @Column()
    name: string
    
    @Column()
    description: string
    
    @Column('decimal', { precision: 10, scale: 2 })
    price: number
    
    @Column()
    stock: number
    
    @Column({ default: 'default image url' })
    imgUrl: string
}

//Shift + Alt + A
/* id: 
name: 
description: 
price: 
stock: 
imgUrl: 
category_id  (Relación 1:N).
Relación N:N con orderDetails. */