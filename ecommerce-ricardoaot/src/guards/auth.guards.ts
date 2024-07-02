import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import { JwtService } from "@nestjs/jwt";



@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService
    ) { }

    canActivate(
        context: ExecutionContext
    ): boolean | Promise<boolean> | Observable<boolean> {
        
        const request = context.switchToHttp().getRequest();

        const token = request.headers['authorization']?.split(' ')[1] ?? '';

        if(!token) {
            throw new UnauthorizedException('Bearer Token not found');
        }

        try {
            const secret = process.env.JWT_SECRET;
            const payLoad = this.jwtService.verify(
                token, 
                {secret}
            );

            payLoad.iat = new Date(payLoad.iat * 1000);
            payLoad.exp = new Date(payLoad.exp * 1000);
            
            request.user = payLoad;
            return true
            
        } catch (error) {
            throw new UnauthorizedException('Invalid Bearer Token');
        }
    }
}