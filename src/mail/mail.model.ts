import { ApiProperty } from "@nestjs/swagger/dist";
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Mail {
  @ApiProperty({example: '1', description: 'Id'})
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({example: '56', description: 'Id пользователя'})
  @Column()
  id_user: number;

  @ApiProperty({example: 'send', description: 'Тип письма'})
  @Column()
  type: string;

  @ApiProperty({example: 'Спам', description: 'Тема'})
  @Column()
  theme: string;

  @ApiProperty({example: 'Информационная рассылка', description: 'Содержание письма'})
  @Column()
  subject: string;

  @ApiProperty({example: 'Sender@mail.ru', description: 'Отправитель'})
  @Column()
  sender: string;
}
