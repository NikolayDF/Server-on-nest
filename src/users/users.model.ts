import { ApiProperty } from "@nestjs/swagger/dist";
import { IsString, IsEmail, Length } from "class-validator";
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @ApiProperty({example: '1', description: 'Id'})
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({example: 'login', description: 'Логин пользователя'})
  @IsString({message: 'Должно быть строкой'})
  @Length(1, 30, {message: 'Не меньше 1 и не больше 30 символов'})
  @Column()
  login: string;

  @ApiProperty({example: 'mail@mail.ru', description: 'Почтовый адрес'})
  @IsString({message: 'Должно быть строкой'})
  @IsEmail({},{message: 'Некорректный E-mail'})
  @Column({unique: true})
  email: string;

  @ApiProperty({example: '12345', description: 'Пароль'})
  @IsString({message: 'Должно быть строкой'})
  @Length(4, 30, {message: 'Не меньше 4 и не больше 30 символов'})
  @Column()
  password: string;

  @ApiProperty({example: '\\image\\id', description: 'Адрес до изображения'})
  @Column({ default: '' })
  image: string;
}
