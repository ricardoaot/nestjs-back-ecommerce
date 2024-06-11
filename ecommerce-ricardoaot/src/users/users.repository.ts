import { Injectable } from "@nestjs/common";

interface User {
    id:number
    email: string
    name: string
    password: string
    address: string
    phone: string
    country?: string | undefined
    city?: string | undefined
}
@Injectable()
export class UsersRepository {
    private users: User[] = [
        { id: 1, email: 'user1@gmail.com name', name: 'User 1', password: '1234', address: 'Calle 1', phone: '1123456789', country: 'Venezuela' },
        { id: 2, email: 'user2@gmail.com name', name: 'User 2', password: '1234', address: 'Calle 1', phone: '2123456789', country: 'Peru', city: 'Lima' },
        { id: 3, email: 'user3@gmail.com name', name: 'User 3', password: '1234', address: 'Calle 1', phone: '3123456789', country: 'Colombia', city: 'Medellin' },
    ]
    async getUsers(): Promise<User[]> {
        return this.users;
    }
}