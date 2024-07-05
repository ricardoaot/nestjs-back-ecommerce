import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEmail, IsNotEmpty, IsNumberString, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class SignUpDto {
    @ApiProperty({
        example: 'Ricardo',
        description: 'Name of the user',
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(80)
    name: string;


    @ApiProperty({
        example: 'ricardo@example.com',
        description: 'Email of the user',
    })
    @IsEmail()
    @IsString()
    @IsNotEmpty()
    email: string;


    @ApiProperty({
        example: 'Ricardo@1234',
        description: 'Password of the user',
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @MaxLength(15)
    @Matches(
        /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/, 
        { 
            message: 'Password too weak. The password must contain at least one lowercase letter, one uppercase letter, one number, and one of the following special characters: !@#$%^&*' 
        })
    password: string;

    @ApiProperty({
        example: 'Calle 123',
        description: 'Address of the user',
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(80)
    address: string;

    @ApiProperty({
        example: '12345678',
        description: 'Phone of the user',
    })
    @IsNumberString()
    phone: string;

    @ApiProperty({
        example: 'Peru',
        description: 'Country of the user',
    })
    @IsString()
    @MinLength(3)
    @MaxLength(20)
    @IsOptional()
    country?: string;

    @ApiProperty({
        example: 'Lima',
        description: 'City of the user',
    })
    @IsString()
    @MinLength(3)
    @MaxLength(20)
    @IsOptional()
    city?: string;

    
    @ApiProperty({
        example: 'true',
        description: 'Is admin of the user',
    })
    @IsBoolean()
    @IsOptional()
    isAdmin?: boolean;
}
