import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  Res, Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { Response, response } from 'express';
import { AuthGuard } from '../../guards/auth.guards';
import { CreateUserDto } from './user.dto';
import { RolesGuard } from '../../guards/roles.guards';
import { Roles } from '../../decorators/roles.decorator';
import { RolesEnum } from './enum/roles.enum';
import { ApiTags, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get('/')
  @Roles(RolesEnum.Admin)
  @UseGuards(
    AuthGuard,
    RolesGuard
  ) 
  @ApiBearerAuth()
  @ApiQuery({ name: 'limit', required: false, description: 'Number of elements per page', schema: { default: 5 } })
  @ApiQuery({ name: 'page', required: false, description: 'Page number', schema: { default: 1 } })

  async getUsers(
    @Query('limit') limit: number = 5,
    @Query('page') page: number = 1,
    @Req() request: Request,
    @Res() response: Response,
  ) {
    try{
      const result = await this.usersService.getUsers(limit, page);
      return response.status(200).send(result);  
    }catch(error) {
      throw new BadRequestException(error.message);
    }
  }




  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()

  async getUserById(
    @Param('id', ParseUUIDPipe) id: string, 
    @Res() response: Response
  ) {
    try{
      const result = await this.usersService.getUserById(id);
      return response.status(200).send(result);
    }catch(error) {
      throw new BadRequestException(error.message);
    }
  }




  @Put('/:id')
  @UseGuards(AuthGuard)

  async updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() user: User,
    @Res() response: Response,
  ) {
    try{
      const result = await this.usersService.updateUser(user, id);
      return response.status(200).send({ message: 'User updated', id: result });
    }catch(error) {
      throw new BadRequestException(error.message);
    }
  }



  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  
  async deleteUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Res() response: Response,
  ) {
    try{
      const result = await this.usersService.deleteUser(id);
      return response.status(200).send({ message: 'User deleted', id: result });
    }catch(error) {
      throw new BadRequestException(error.message);
    }
  }
}
