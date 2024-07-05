import { ApiProperty } from "@nestjs/swagger";
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from 'uuid';

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
}