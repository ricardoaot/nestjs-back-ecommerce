import { Body, Controller, Get, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Post('/signin')
    async signIn(
        @Body('email') email: string, @Body('password') password: string
    ){ 
        if(!email || !password) return ({message: 'Email or password empty'})
        const user = await this.authService.getUserByEmail(email);
        if(!user) return ({message: 'Email or password incorrect'})
            
        const result = await this.authService.signIn(email, password);
        if(!result) return ({message: 'Email or password incorrect'}) 
        return result
    }
}