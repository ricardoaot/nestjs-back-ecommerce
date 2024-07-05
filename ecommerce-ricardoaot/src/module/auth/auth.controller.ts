import { 
    BadRequestException, 
    Body, 
    Controller, 
    Get, Post, 
    Res, Req 
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignInDto } from "./dto/signIn.dto";
import { SignUpDto } from "./dto/signUp.dto";
import { Request, Response } from "express";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) { }

    @Post('/signin')
    async signIn(
        // @Body('email') email: string, 
        // @Body('password') password: string,
        @Body() login: SignInDto
    ) {
        try {
            const { email, password } = login
            if (!email || !password) return ({ message: 'Email or password empty' })
            
            return await this.authService.signIn(login);

        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @Post('/signup')
    async signUp(
        @Body() user: SignUpDto,
        @Res() response: Response,
        @Req() request: Request
    ) {
        try {
            const signUpResult = await this.authService.signUp(user);
            return response.status(201).send({ message: 'User created', signUpResult });
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}