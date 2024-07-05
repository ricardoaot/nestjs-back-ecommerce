import { PickType } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { SignUpDto } from "./signUp.dto";

export class SignInDto 
     extends PickType (SignUpDto, ['email']) 
    {
        @IsNotEmpty()
        @IsString()
        password: string;
    }