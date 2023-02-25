import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from './users/users.module';
import { User } from "./users/users.model";

import { MailModule } from './mail/mail.module';
import { Mail } from "./mail/mail.model";

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'mail.db',
      entities: [User, Mail],
      synchronize: true,
    }),
    UsersModule,
    MailModule,
  ],
})
export class AppModule {}
