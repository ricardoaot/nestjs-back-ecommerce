import { Injectable } from "@nestjs/common";
import { User } from "./user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserDto } from "./user.dto";

@Injectable()
export class UsersRepository {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>
    ) {}
    async getUsers(limit: number, page: number): Promise<User[]> {
        const result = await this.userRepository.find({
            skip: (page - 1) * limit,
            take: limit
        })

        return result
    }

    async getUserById(id: string): Promise<User> {  
        const result = await this.userRepository.findOne(
            {
                where: {id:id},
                relations: {
                    orders:true
/*
                    {
                        orderDetails:{
                            product:true
                        }
                    }
*/
                },
                select: {
                    id:true,
                    name:true,
                    email:true
                }
            },
        );
        return result;
    }
    async getUserByEmail(email: string): Promise<User> {  
        const result = await this.userRepository.findOneBy({email});
        return result;
    }
    async createUser(
        user: CreateUserDto
    ): Promise <Omit <User, 'password'>> {
        const createdUser = await this.userRepository.save(user);
        const  { password, ...userWithoutPassword } = createdUser;
        return userWithoutPassword;
    }

    async updateUser(user: User, id: string): Promise<string|null> {
        const foundUser = await this.userRepository.findOneBy({id});
        if(!foundUser) return null;
        const updatedUser = {...foundUser, ...user}
        await this.userRepository.save(updatedUser);
        return updatedUser.id;
    }

    async deleteUser(id: string): Promise<string|null> {
        const foundUser = await this.userRepository.findOneBy({id});
        if(!foundUser) return null;
        const deletedUser = await this.userRepository.remove(foundUser);
        return deletedUser.id;
    }

    /*
    async logInUser(
        email: string, sentPassword: string
    ): Promise <Omit <User,'password'>> {
        const foundUser = await this.userRepository.findOne({
            where: {
                email: email,
                password: sentPassword
            }
        })
        if(!foundUser) return null;
        const { password, ...userWithoutPassword } = foundUser;
        return userWithoutPassword;
    }*/
}