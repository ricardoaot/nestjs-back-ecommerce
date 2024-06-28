import { Entity, Column, JoinColumn, CreateDateColumn, PrimaryGeneratedColumn, OneToOne, OneToMany, ManyToOne } from "typeorm";
import { v4 as uuid } from 'uuid';
import { OrderDetail } from "../orderDetails/orderDetail.entity";
import { User } from "../users/user.entity";

@Entity({   
    name: 'orders'
})

export class Order {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid();

    //@Column()
    //userId: string;

    @ManyToOne(
        () => User, 
        (user) => user.orders
    )
    user: User

    @Column({ 
        type: 'date',
        default: new Date() 
    })
    date: Date;

    @OneToOne(()=> OrderDetail)
    @JoinColumn()
    orderDetails: OrderDetail

    /*
    @OneToMany(
        () => OrderDetail, 
        (orderDetail) => orderDetail.order
    )
    orderDetails: OrderDetail[]
    */
}
