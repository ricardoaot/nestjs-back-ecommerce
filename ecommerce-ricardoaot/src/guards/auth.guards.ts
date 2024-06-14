import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { Request } from "express";

function validateRequest(request: Request) {
    //const token = request.headers['token']
    const authorization = request.headers['authorization']

    if(authorization === 'Basic: <email>:<password>') {
        return true
    }
    return false      
}

@Injectable()
export class AuthGuard implements CanActivate {
    canActivate(
        context: ExecutionContext
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        return validateRequest(request)
    }
}