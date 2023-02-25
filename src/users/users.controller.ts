import {Body, Controller, Post, Get } from '@nestjs/common';
import { HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger/dist';
import { User } from './users.model';

@ApiTags( 'Пользователи')
@Controller('users')
export class UsersController {
  
  constructor(private usersService: UsersService) {}
  
  @ApiOperation( {summary: 'Регистрация'})
  @ApiResponse( {status: 200, type: User})
  @Post()
  async create(@Body() userDto: User)
  {
    try {
      return await this.usersService.createUser(userDto)
    }
    catch (error) { 
      throw new HttpException({
        status: HttpStatus.CONFLICT,
        error: `Пользователь с почтовым адресом ${userDto.email} уже зарегистрирован.`,
      }, HttpStatus.INTERNAL_SERVER_ERROR, {
        cause: error
      });
    }
  }
  
  @ApiOperation( {summary: 'Вывод всех пользователей'})
  @ApiResponse( {status: 200, type: [User]})
  @Get()
  getAll() {
    return this.usersService.findAll();
  }

}
