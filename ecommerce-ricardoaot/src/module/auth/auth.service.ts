import { Injectable } from "@nestjs/common";
import { UsersRepository } from "src/module/users/users.repository";
import { User } from "src/module/users/user.entity";
import { LogInUserDto } from "./loginUser.dto";

@Injectable()
export class AuthService {
    constructor(
        private readonly usersRepository: UsersRepository
    ){}
    async signIn(login: LogInUserDto): Promise <Omit <User,'password'>> {
        const {email, password} = login
        const user = await this.usersRepository.logInUser(email, password);
        return user;
    }
    async getUserByEmail(email: string): Promise<Omit <User,'password'>> {
        const user = await this.usersRepository.getUserByEmail(email);
        return user;       
    }

    
}
