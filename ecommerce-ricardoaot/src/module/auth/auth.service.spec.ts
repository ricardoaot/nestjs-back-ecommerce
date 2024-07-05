import { UsersRepository } from "../users/users.repository";
import { AuthService } from "./auth.service";
import { JwtService } from "@nestjs/jwt";
import { Test, TestingModule } from "@nestjs/testing";
import { User } from "../users/user.entity";
import { DataSource } from "typeorm";
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
    let service: AuthService;    
    let usersRepository: UsersRepository;
    let jwtService: JwtService;
    let datasource: DataSource;
    
    let newUser: User = {
        id: "4871688e-e431-40c6-99f5-7f841423bae9",            
        email: "test.auth@gmail.com",
        name: "User 4",
        password: "test.auth@1234",
        address: "Calle 4",
        phone: "4123456789",
        city: "Lima",
        country: "Peru",
        isAdmin: true,
        orders: [],
    }
    
    beforeEach(async () => {
        
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: UsersRepository,    
                    useValue: {
                        getUserByEmail: jest.fn().mockResolvedValue(newUser),
                        createUser: jest.fn().mockResolvedValue(newUser),
                    },    
                },
                {
                    provide: JwtService,
                    useValue: {
                        signAsync: jest.fn().mockResolvedValue("test"),
                    },
                },
            ],
        }).compile();
        
        //datasource = module.get<DataSource>(DataSource);
        //await datasource.initialize();
        //await datasource.query(`DELETE FROM users;`)

        service = module.get<AuthService>(AuthService);
        usersRepository = module.get<UsersRepository>(UsersRepository);
        jwtService = module.get<JwtService>(JwtService);
    });

    afterAll(async () => {
        //await datasource.query(`DELETE FROM users WHERE email = 'test.auth@gmail.com';`)
        //await module.close();
    })

    it('should verify that service is defined', () => {
        expect(service).toBeDefined();
    });

    it('should verify that usersRepository is defined', () => {
        expect(usersRepository).toBeDefined();
    });

    it('should verify that jwtService is defined', () => {  
        expect(jwtService).toBeDefined();
    });

    it('should add user', async () => {
        const result = await service.signUp(newUser);
        expect(result).toBeDefined();
    });

    it('should get user by email', async () => {
        const result = await service.getUserByEmail(newUser.email);
        expect(result).toBeDefined();
    });

    it('should return a user and token if credentials are valid', async () => {
        const user = { id: 1, email: 'test@example.com', password: 'hashedpassword', isAdmin: false };
        const userWithoutSensitiveData = { id: 1, email: 'test@example.com' };
        const token = 'some-jwt-token';
        usersRepository.getUserByEmail = jest.fn().mockResolvedValue(user);
        bcrypt.compare = jest.fn().mockResolvedValue(true);
        jwtService.signAsync = jest.fn().mockResolvedValue(token);
    
        const loginDto = { email: 'test@example.com', password: 'password' };
    
        const result = await service.signIn(loginDto);
    
        expect(result).toEqual({
          user: userWithoutSensitiveData,
          token: token,
        });
      });

})