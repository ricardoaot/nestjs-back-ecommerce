import { BadRequestException, Injectable } from "@nestjs/common";
import { UsersRepository } from "../../module/users/users.repository";
import { User } from "../../module/users/user.entity";
import { SignInDto } from "./dto/signIn.dto";
import { SignUpDto } from "./dto/signUp.dto";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';
import { RolesEnum } from "../users/enum/roles.enum";

@Injectable()
export class AuthService {
    constructor(
        private readonly usersRepository: UsersRepository,
        private readonly jwtService: JwtService
    ){}

    
    async signIn(
        login: SignInDto
    )//: Promise <Omit <User,'password'>> 
    {
        const { email, password: clientPassword } = login

        const user = await this.getUserByEmail(email);
        if (!user) 
            throw new BadRequestException('Email or password incorrect');
        
        const isPasswordValid = await bcrypt.compare(clientPassword, user.password);

        if (!isPasswordValid) 
            throw new BadRequestException('Email or password incorrect');
        
        const role = user.isAdmin ? RolesEnum.Admin : RolesEnum.User

        const { isAdmin, password: _, ...userWithoutSensitiveData } = user

        const userPayload = {
            sub: user.id,
            id: user.id,
            email: user.email,
            roles: [
                role //user.isAdmin ? RolesEnum.Admin : RolesEnum.User
            ]
        }

        const token = await this.jwtService.signAsync(userPayload)

        return {
            user: userWithoutSensitiveData, 
            token: token
        }        
    }
    

    async signUp(
        user: SignUpDto
    ): Promise <Partial <User> > {
        const {password} = user
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = {...user, password: hashedPassword}
        const createdUser = await this.usersRepository.createUser(newUser);
        return createdUser;
    }

    async getUserByEmail(email: string): Promise<User> {
        const user = await this.usersRepository.getUserByEmail(email);
        return user;       
    }

    
}
