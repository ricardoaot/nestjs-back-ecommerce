import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEmail, IsNotEmpty, IsNumberString, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class UpdateProductDTO {    
    @ApiProperty({
        example: 'Product Name',
        description: 'Name of the updated product',
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    @IsOptional()
    name: string
    

    @ApiProperty({
        example: 'Product description',
        description: 'Description of the updated product',
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(500)
    @IsOptional()
    description: string
    

    @ApiProperty({
        example: '10.00',
        description: 'Price of the updated product',
    })
    @IsNotEmpty()
    @IsNumberString()
    @IsOptional()
    //@Column('decimal', { precision: 10, scale: 2 })
    price: number
    

    @ApiProperty({
        example: '20',
        description: 'Stock of the updated product',
    })
    @IsNumberString()
    @IsOptional()
    stock: number
    

    @ApiProperty({
        example: 'http://defaultImageUrl.com',
        description: 'Image url of the updated product',
    })
    @IsString()
    @IsOptional()
    imgUrl: string
    //imgUrl?: string // Use ? if you don use @IsOptional

}






