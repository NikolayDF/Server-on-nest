import { Body, Controller, Post, Get, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger/dist';
import { User } from './users.model';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';

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
      return await this.usersService.createUser(userDto);
    }
    catch (error) {
      if(error.code === 'SQLITE_CONSTRAINT') {
        return {message:`Пользователь с почтовым адресом ${userDto.email} уже зарегистрирован.`, status: 409}
      }
      throw new HttpException('Неизвестная ошибка', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
  
  @ApiOperation( {summary: 'Вывод всех пользователей'})
  @ApiResponse( {status: 200, type: [User]})
  @UseGuards(JwtAuthGuard)
  @Get()
  getAll() {
    return this.usersService.findAll();
  }

  @ApiOperation( {summary: 'Изменение аватара'})
  @ApiResponse( {status: 200, type: User})
  @UseInterceptors(FileInterceptor('image'))
  @Post('/avatar')
  createAvatar(@UploadedFile() image)
  {
    return this.usersService.createAvatar(image);
  }

}
