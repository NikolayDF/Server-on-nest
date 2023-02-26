import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from './users/users.module';
import { User } from "./users/users.model";

import { MailModule } from './mail/mail.module';
import { Mail } from "./mail/mail.model";
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';

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
    AuthModule,
  ],
})
export class AppModule {}
