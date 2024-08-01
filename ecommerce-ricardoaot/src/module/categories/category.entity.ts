import { ApiProperty } from "@nestjs/swagger";
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from "typeorm";
import { v4 as uuid } from 'uuid';
import { Product } from "../products/product.entity";

@Entity({
    name: 'categories'
})

export class Category {
    @PrimaryGeneratedColumn('uuid')
    @ApiProperty({
        example: '7d0f4f16-a5b2-40c6-b677-f22574c020c4',
        description: 'UUID of the category',
    })
    id: string = uuid();

    @Column(
        { length: 50 }
    )
    name: string

    @OneToMany(() => Product, (product) => product.category)
    //@JoinColumn()
    products: Product[]
}