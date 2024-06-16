import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from 'uuid';

@Entity({
    name: 'categories'
})

export class Category {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid();

    @Column()
    name: string
}