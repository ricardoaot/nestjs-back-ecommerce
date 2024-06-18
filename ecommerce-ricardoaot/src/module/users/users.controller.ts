import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query, Res, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { User } from "./user.entity";
import { Response, response } from "express";
import { AuthGuard } from "src/guards/auth.guards";

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService){}

    @Get('/')
    @UseGuards(AuthGuard)
    async getUsers(
        @Query('limit') limit: number = 5, @Query('page') page: number = 1, @Res() response: Response
    ){
        const result = await this.usersService.getUsers(limit, page);
        return response.status(200).send(result);
    }

    @Get(':id')
    @UseGuards(AuthGuard)
    async getUserById(@Param('id') id: string, @Res() response: Response){
        const result = await this.usersService.getUserById(id);
        return response.status(200).send(result);
    }

    @Post('/')
    async createUser(@Body() user: Omit<User, 'id'>, @Res() response: Response){
        const id = await this.usersService.createUser(user);
        return response.status(201).send({message: 'User created', id:id});
    }

    @Put('/:id')
    @UseGuards(AuthGuard)
    async updateUser(@Param('id') id: string, @Body() user: User, @Res() response: Response){
        const result = await this.usersService.updateUser(user, id);
        return response.status(200).send({message: 'User updated', id:result});
    }

    @Delete(':id')
    @UseGuards(AuthGuard)
    async deleteUser(@Param('id') id: string, @Res() response: Response){
        const result = await this.usersService.deleteUser(id);
        return response.status(200).send({message: 'User deleted', id:result});
    }
}