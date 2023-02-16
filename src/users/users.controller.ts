import {Body, Controller, Post, Get } from '@nestjs/common';

@Controller('users')
export class UsersController {
  
  constructor(private usersService: UsersService) {
    
  }
  
  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.usersService.createUser(userDto);
  }
  
  @Get()
  getAll() {
    return this.usersService.getAllUsers();
  }

}
