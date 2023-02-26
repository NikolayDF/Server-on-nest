import { Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { JwtService } from '@nestjs/jwt/dist';
import { User } from 'src/users/users.model';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {

  constructor
  (
    private userService: UsersService,
    private jwtService: JwtService
  ) {}

  async login(dto: User) {
    const user = await this.validateUser(dto);
    return this.generateToken(user);
  }

  async registration(dto: User) {
    const user = await this.userService.getUser(dto.email);
    if (user) {
      throw new HttpException (`Пользователь с ${dto.email} уже существует.`, HttpStatus.BAD_REQUEST)
    }
    const hashPassword = await bcrypt.hash(dto.password, 10);
    const newUser = await this.userService.createUser({...dto, password: hashPassword});
    return this.generateToken(newUser);
  }

  private async generateToken(user: User) {
    const payload = {email: user.email};
    return {
      token: this.jwtService.sign(payload)
    }
  }

  private async validateUser(dto: User) {
    const user = await this.userService.getUser(dto.email);
    const passwordEquals =await bcrypt.compare(dto.password, user.password);
    if (user && passwordEquals) {
      return user;
    }
    throw new HttpException(`Неправильный E-mail или пароль.`, HttpStatus.UNAUTHORIZED);
  }
}
