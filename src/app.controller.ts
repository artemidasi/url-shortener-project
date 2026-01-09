import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserDto } from './create-user.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    return this.appService.getHello();
  }

  @Post()
  createUser(@Body() payload: CreateUserDto) {
    if (!payload.email) {
      throw new BadRequestException();
    }

    return payload;
  }
}
