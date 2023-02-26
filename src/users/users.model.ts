import { ApiProperty } from "@nestjs/swagger/dist";
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @ApiProperty({example: '1', description: 'Id'})
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({example: 'login', description: 'Логин пользователя'})
  @Column()
  login: string;

  @ApiProperty({example: 'mail@mail.ru', description: 'Почтовый адрес'})
  @Column({unique: true})
  email: string;

  @ApiProperty({example: '12345', description: 'Пароль'})
  @Column()
  password: string;

  @ApiProperty({example: '\\image\\id', description: 'Адрес до изображения'})
  @Column({ default: '' })
  image: string;
}
