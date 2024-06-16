import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from 'uuid';
import { Order } from "src/module/orders/orders.entity";

@Entity({
    name: 'users'
})

export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid();

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    phone: string;

    @Column()
    country: string;

    @Column()
    address: string;

    @Column()
    city: string;

    @OneToMany(() => Order, (order) => order.userId)
    orders: Order[]
}