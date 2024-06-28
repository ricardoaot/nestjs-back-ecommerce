import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LogInUserDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}