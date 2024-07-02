import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { RolesEnum } from "src/module/users/enum/roles.enum";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private readonly reflector: Reflector
    ) { }

    canActivate(
        context: ExecutionContext
    ): boolean | Promise<boolean> | Observable<boolean> {

        const requiredRoles = this.reflector.getAllAndOverride <RolesEnum[]> (
            'roles',
            [
                context.getHandler(), 
                context.getClass()
            ]
        )
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        
        const hasRole = () => requiredRoles.some(role => user.roles?.includes(role));

        console.log(user,  user.roles, hasRole())
        const valid = user && user.roles && hasRole();
        if (!valid) {
            throw new ForbiddenException('User does not have permission to access this route');
        }
        return valid
    }


}