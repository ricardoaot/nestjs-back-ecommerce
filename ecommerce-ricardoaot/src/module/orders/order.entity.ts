import { Entity, Column, CreateDateColumn, PrimaryGeneratedColumn, OneToOne, OneToMany, ManyToOne } from "typeorm";
import { v4 as uuid } from 'uuid';
import { OrderDetail } from "src/module/orderDetails/orderDetail.entity";
import { User } from "src/module/users/user.entity";

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

    /*@CreateDateColumn({
        type: 'date'
    })*/
    @Column({ 
        type: 'date',
        default: new Date() 
    })
    date: Date;

    @OneToMany(
        () => OrderDetail, 
        (orderDetail) => orderDetail.order
    )
    orderDetails: OrderDetail[]
}
