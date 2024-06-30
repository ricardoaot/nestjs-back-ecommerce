import { IsEmail, IsNotEmpty, IsNumberString, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class SignUpDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(80)
    name: string;

    @IsEmail()
    @IsString()
    @IsNotEmpty()
    email: string;

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

    
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(80)
    address: string;

    @IsNumberString()
    phone: string;

    @IsString()
    @MinLength(3)
    @MaxLength(20)
    @IsOptional()
    country?: string;

    @IsString()
    @MinLength(3)
    @MaxLength(20)
    @IsOptional()
    city?: string;
}
