import { Injectable } from '@nestjs/common';
import { HttpException, HttpStatus } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import * as uuid from 'uuid';

@Injectable()
export class AvatarService {

  async createFile(file): Promise<string> {
    try {
      const fileName = await uuid.v4() + '.jpeg'; // узнать полное название файла
      const filePath = path.resolve(__dirname, '..', 'static');
      if(!fs.existsSync(filePath)){
        fs.mkdirSync(filePath, {recursive: true})
      }
      if(!fs.existsSync(filePath)){
        return "директория не создана"
      }
      fs.writeFileSync(path.join(filePath, fileName), file.buffer);
      return fileName;
    } catch (e){
      throw new HttpException('Ошибка при установлении аватара', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
