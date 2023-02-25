import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Body } from '@nestjs/common';

@Injectable()
export class UsersService {
  
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  
  /*async createUser(dto: User) {
    const user = await this.usersRepository.create(dto);
    console.log(user);
    console.log(user);
    return user;
  }*/

  createUser(@Body() dto: User) {
    return this.usersRepository.save(dto);
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

}
