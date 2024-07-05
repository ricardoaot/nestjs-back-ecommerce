import { Injectable } from "@nestjs/common";
import { UsersRepository } from "./users.repository";
import { User } from "./user.entity";
import { CreateUserDto } from "./user.dto";

@Injectable()
export class UsersService {
    constructor(
        private readonly usersRepository: UsersRepository
    ) {}
    async getUsers(limit: number, page: number): Promise < Omit<User,'password'> [] > {
        const result = await this.usersRepository.getUsers(limit, page);
        const users = result.map(user => {
            const { password, ...userWithoutPassword } = user;
            return userWithoutPassword
        })
        console.log(users)
        return users
    }

    async getUserById(
        id: string
    ): Promise <any> //Omit <User,'password'>> 
    {
        const result = await this.usersRepository.getUserById(id)
        //const { password, ...user } = result;
        //return user;
        return result
    }

    async createUser(
        user: CreateUserDto
    ): Promise <Partial <User> > {
        return await this.usersRepository.createUser(user);
    }

    async updateUser(user: Partial<User>, id: string): Promise<string|null> {
        return await this.usersRepository.updateUser(user, id);
    }

    async deleteUser(id: string): Promise<string|null> {
        return await this.usersRepository.deleteUser(id);
    }
}