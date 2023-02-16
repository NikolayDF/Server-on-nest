import { ApiProperty } from "@nestjs/swagger/dist";
import { Model, Table, Column, DataType } from "sequelize-typescript";

interface UserCreationAttrs {
  login: string;
  email: string;
  password: string;
}

@Table({tableName: 'users'})
export class User extends Model<User, UserCreationAttrs> {
  @ApiProperty({example: '1', description: 'Id'})
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;

  @ApiProperty({example: 'login', description: 'Логин пользователя'})
  @Column({type: DataType.STRING, allowNull: false})
  login: string;

  @ApiProperty({example: 'mail@mail.ru', description: 'Почтовый адрес'})
  @Column({type: DataType.STRING, unique: true, allowNull: false})
  email: string;

  @ApiProperty({example: '12345', description: 'Пароль'})
  @Column({type: DataType.STRING, allowNull: false})
  password: string;

  @ApiProperty({example: '\\image\\id', description: 'Адрес до изображения'})
  @Column({type: DataType.STRING})
  image: string;
}
