import { PickType,ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { SignUpDto } from "./signUp.dto";

export class SignInDto 
     extends PickType (SignUpDto, ['email']) 
    {
        @ApiProperty({
            example: 'Ricardo@1234',
            description: 'Password of the user',
        })
        @IsNotEmpty()
        @IsString()
        password: string;
        
    }