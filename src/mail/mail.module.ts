import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { Mail } from './mail.model';

@Module({
  providers: [MailService],
  controllers: [MailController],
  imports: [
    TypeOrmModule.forFeature([Mail])
  ]
})
export class MailModule {}
