import { Injectable } from "@nestjs/common";
import { UsersRepository } from "./users.repository";
import { User } from "./user.interface";

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

    async getUserById(id: number): Promise<Omit <User,'password'>> {
        const result = await this.usersRepository.getUserById(id)
        const { password, ...user } = result;
        return user;
    }

    async createUser(user: Omit<User, 'id'>): Promise<number> {
        return await this.usersRepository.createUser(user);
    }

    async updateUser(user: User, id: number): Promise<number|null> {
        return await this.usersRepository.updateUser(user, id);
    }

    async deleteUser(id: number): Promise<number|null> {
        return await this.usersRepository.deleteUser(id);
    }
}