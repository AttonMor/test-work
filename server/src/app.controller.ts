import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { AppService } from './app.service';
import { UrlDto } from './url.dto';
import { File } from './app.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('')
  @HttpCode(200)
  async getSources(
    @Body(new ValidationPipe()) urlDto: UrlDto,
  ): Promise<File[]> {
    try {
      return await this.appService.getSource(urlDto.url);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
}
