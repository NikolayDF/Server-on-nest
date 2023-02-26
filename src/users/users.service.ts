import { Injectable, Body } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AvatarService } from 'src/avatar/avatar.service';
import { Repository } from 'typeorm';

import { User } from './users.model';

@Injectable()
export class UsersService {
  
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private avatarService: AvatarService,
  ) {}

  createUser(@Body() dto: User) {
    return this.usersRepository.save(dto);
  }

  async createAvatar(@Body() image: any) {
    const fileName = await this.avatarService.createFile(image)
    return fileName;
  }

  getUser(email: string) {
    return this.usersRepository.findOne({where: {email}});
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }
}
