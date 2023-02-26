import { Injectable, Body } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './users.model';

@Injectable()
export class UsersService {
  
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  
  createUser(@Body() dto: User) {
    return this.usersRepository.save(dto);
  }

  getUser(email: string) {
    return this.usersRepository.findOne({where: {email}});
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }
}
