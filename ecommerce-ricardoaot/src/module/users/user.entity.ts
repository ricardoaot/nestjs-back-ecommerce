import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from 'uuid';
import { Order } from "src/module/orders/order.entity";

@Entity({
    name: 'users'
})

export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid();

    @Column({ length: 50 })
    name: string;

    @Column({ 
        unique: true,
        length: 50 
    })
    email: string;

    @Column({
        length: 40 // 20 was original requeriment but it was too short for hashing
    })
    password: string;

    @Column(
        'int', 
        {nullable: true}
    )
    phone: number;

    @Column({
        length: 50,
        nullable: true
    })
    country: string;

    @Column(
        {nullable: true}
    )
    address: string;

    @Column({
        length: 50,
        nullable: true
    })
    city: string;

    @Column({ 
        type: 'date',
        default: new Date() 
    })
    createdAt: Date;

    @OneToMany(
        () => Order, 
        (order) => order.user
    )
    orders: Order[]
}