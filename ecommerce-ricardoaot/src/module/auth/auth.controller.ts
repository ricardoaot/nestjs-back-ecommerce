import { HttpException, HttpStatus, BadRequestException, Body, Controller, Get, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LogInUserDto } from "./loginUser.dto";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Post('/signin')
    async signIn(
        // @Body('email') email: string, 
        // @Body('password') password: string,
        @Body() login: LogInUserDto
    ){ 
        try {
            const {email, password} = login
            if(!email || !password) return ({message: 'Email or password empty'})
            const user = await this.authService.getUserByEmail(email);
            if(!user) return ({message: 'Email or password incorrect'})
                
            const result = await this.authService.signIn(login);
            if(!result) return ({message: 'Email or password incorrect'}) 
            return result
        } catch (error) {
            throw new BadRequestException(error.message);
            /*throw new HttpException(
                {
                status: HttpStatus.BAD_REQUEST,
                error: error.message,
                },
                HttpStatus.BAD_REQUEST,
            );*/
        }
    }
}