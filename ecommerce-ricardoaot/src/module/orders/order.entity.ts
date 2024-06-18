import { Entity, Column, CreateDateColumn, PrimaryGeneratedColumn, OneToOne, OneToMany } from "typeorm";
import { v4 as uuid } from 'uuid';
import { OrderDetail } from "src/module/orderDetails/orderDetail.entity";

@Entity({   
    name: 'orders'
})

export class Order {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid();

    @Column()
    userId: string;

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
        (orderDetail) => orderDetail.order_id
    )
    orderDetails: OrderDetail[]
}
