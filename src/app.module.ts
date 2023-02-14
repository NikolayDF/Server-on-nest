import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    SequelizeModule.forRoot({ /* проверить настройки */
      dialect: 'sqlite',
      host: process.env.HOST_DB,
      port: Number(process.env.PORT_DB),
      username: process.env.USER_DB,
      password: process.env.PASS_DB,
      database: process.env.DATABASE,
      models: [],
      autoLoadModels: true
    }),
    UsersModule,
  ],
})
export class AppModule {}