import { Injectable, Body } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Mail } from './mail.model';

@Injectable()
export class MailService {
  constructor(
    @InjectRepository(Mail)
    private usersRepository: Repository<Mail>,
  ) {}
  
  createMail(@Body() dto: Mail) {
    return this.usersRepository.save(dto);
  }

  findAllForUser(idUser: number): Promise<Mail[]> {
    return this.usersRepository.findBy({
        id_user: idUser,
    });
  }

  findAll(): Promise<Mail[]> {
    return this.usersRepository.find();
  }
}
