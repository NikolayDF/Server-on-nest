import { ApiProperty } from "@nestjs/swagger/dist";

export class CreateUserDto {
  @ApiProperty({example: 'login', description: 'Логин'})
  readonly login: string;

  @ApiProperty({example: 'mail@mail.ru', description: 'Почтовый адрес'})
  readonly email: string;

  @ApiProperty({example: '12345', description: 'Пароль'})
  readonly password: string;
}
