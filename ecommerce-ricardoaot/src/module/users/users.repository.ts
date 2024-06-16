import { Injectable } from "@nestjs/common";
import { User } from "./user.interface";

@Injectable()
export class UsersRepository {
    private users: User[] = [
        { id: 1, email: 'user1@gmail.com', name: 'User 1', password: '1234', address: 'Calle 1', phone: '1123456789', country: 'Venezuela' },
        { id: 2, email: 'user2@gmail.com', name: 'User 2', password: '1234', address: 'Calle 1', phone: '2123456789', country: 'Peru', city: 'Lima' },
        { id: 3, email: 'user3@gmail.com', name: 'User 3', password: '1234', address: 'Calle 1', phone: '3123456789', country: 'Colombia', city: 'Medellin' },
    ]
    async getUsers(limit: number, page: number): Promise<User[]> {
        const result = this.users.slice((page-1)*limit, page*limit);
        return result;
    }

    async getUserById(id: number): Promise<User> {  
        const result = this.users.find(user => user.id === id)
        return result;
    }
    async getUserByEmail(email: string): Promise<User> {  
        const result = this.users.find(user => user.email === email)
        return result;
    }
    async createUser(user: Omit<User, 'id'>): Promise<number> {
        const id =  this.users.length + 1
        this.users = [...this.users, {id, ...user}];
        return id;
    }

    async updateUser(user: User, id: number): Promise<number|null> {
        const index = this.users.findIndex(u => u.id === id);
        if(index !== -1) {
            this.users[index] = {...this.users[index], ...user};
            return id;  
        }
        return null;
    }

    async deleteUser(id: number): Promise<number|null> {
        const index = this.users.findIndex(u => u.id === id);
        if(index !== -1) {
            this.users.splice(index, 1);
            return id;
        }
        return null;
    }

    async logInUser(email: string, sentPassword: string): Promise<Omit<User,'password'>> {
        const result = this.users.find(user => user.email === email && user.password === sentPassword);
        
        if(!result) return null;

        const { password, ...userWithoutPassword } = result;
        return userWithoutPassword;
    }
}