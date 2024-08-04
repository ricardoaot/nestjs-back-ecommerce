import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEmail, IsNotEmpty, IsNumberString, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class NewProductDTO {    
    @ApiProperty({
        example: 'Product Name 1',
        description: 'Name of the new product',
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    name: string
    
    @ApiProperty({
        example: 'Product description',
        description: 'Description of the new product',
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(500)
    description: string
    

    @ApiProperty({
        example: '10.00',
        description: 'Price of the new product',
    })
    @IsNotEmpty()
    @IsNumberString()
    //@Column('decimal', { precision: 10, scale: 2 })
    price: number
    

    @ApiProperty({
        example: '20',
        description: 'Stock of the new product',
    })
    @IsNumberString()
    stock: number
    

    @ApiProperty({
        example: 'http://defaultImageUrl.com',
        description: 'Image url of the new product',
    })
    @IsString()
    @IsOptional()
    imgUrl: string


    @ApiProperty({
        example: 'smartphone',
        description: 'Type of product',
    })
    @IsString()
    category: string

}






