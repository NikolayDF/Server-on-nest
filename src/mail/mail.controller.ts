import {Body, Controller, Post, Get } from '@nestjs/common';
import { HttpException, HttpStatus } from '@nestjs/common';
import { MailService } from './mail.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger/dist';
import { Mail } from './mail.model';
import { Param } from '@nestjs/common/decorators';

@ApiTags('Письма')
@Controller('mails')
export class MailController {

  constructor(private mailsService: MailService) {}
  
  @ApiOperation( {summary: 'Запись письма в БД'})
  @ApiResponse( {status: 200, type: Mail})
  @Post()
  async create(@Body() mailDto: Mail)
  {
    try {
      return await this.mailsService.createMail(mailDto)
    }
    catch (error) {
      console.log(error);
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: `На сервере произошла ошибка.`,
      }, HttpStatus.INTERNAL_SERVER_ERROR, {
        cause: error
      });
    }
  }

  @ApiOperation( {summary: 'Вывод всех писем по пользователю'})
  @ApiResponse( {status: 200, type: [Mail]})
  @Get(':id')
  findAllForUser(@Param() params) {
    return this.mailsService.findAllForUser(params.id);
  }
  
  @ApiOperation( {summary: 'Вывод всех писем'})
  @ApiResponse( {status: 200, type: [Mail]})
  @Get()
  getAll() {
    return this.mailsService.findAll();
  }

}
