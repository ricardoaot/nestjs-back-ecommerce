import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { CreateUserDto } from './user.dto';
import { User } from './user.entity';
import { UsersRepository } from './users.repository';

describe('UsersController', () => {
  let usersService: UsersService;
  const newUserData = {
    id: "aef4f6f7-8f8f-8f8f-8f8f-8f8f8f8f8f8f",
    name: "test",
    email: "test.auth@gmail.com",
    password: "test1234",
    address: "Calle 4",
    phone: "4123456789",
  }

  beforeEach(async () => {
    const mockUsersRepository = {
      getUsers: jest.fn(),
      getUserById: jest.fn(),
      getUserByEmail: jest.fn(),
      createUser: jest.fn(),
      updateUser: jest.fn()
                  .mockResolvedValue(
                    newUserData.id
                  ),
      deleteUser: jest.fn(),
    }

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: UsersRepository,
          useValue: mockUsersRepository,
        },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
  });

  it('should verify that service is defined', () => {
    expect(usersService).toBeDefined();
  });

  it('should update user', async () => {
    const result = await usersService.updateUser(newUserData, newUserData.id)
    expect(result).toEqual(newUserData.id)
  })

});
