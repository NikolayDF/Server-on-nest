import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from './users/users.module';
import { User } from "./users/users.model";

import { MailModule } from './mail/mail.module';
import { Mail } from "./mail/mail.model";
import { AuthModule } from './auth/auth.module';
import { AvatarService } from './avatar/avatar.service';
import { AvatarModule } from './avatar/avatar.module';

import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';

@Module({
  controllers: [],
  providers: [AvatarService],
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
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static'),
    }),
    UsersModule,
    MailModule,
    AuthModule,
    AvatarModule,
  ],
})
export class AppModule {}
