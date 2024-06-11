import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        console.log(`Executing middleware for the method ${req.method} in the path ${req.url}`);
        next();
    }
}

export function GlobalLoggerMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
) {
    console.log(`Executing global middleware for the method ${req.method} in the path ${req.url}`);
    next();
}
