import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  ParseIntPipe,
  Put,
  UseFilters,
} from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { ResponseMessageDto } from './dto/response-message.dto';
import { Message } from './message.entity';
import { MessagesService } from './messages.service';
import { HttpExceptionFilter } from 'src/common/filters/http-exception.filter';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  create(@Body() createMessageDto: CreateMessageDto): ResponseMessageDto {
    return this.messagesService.create(createMessageDto);
  }

  @Put(':id')
  //@Post(':id') // for HTTP PUT test
  update(@Param('id') id: number, @Body() updateMessageDto: CreateMessageDto): Promise<ResponseMessageDto> {
    return this.messagesService.update(id, updateMessageDto);
  }

  @Get()
  findAll(): Promise<ResponseMessageDto> {
    return this.messagesService.findAll();

  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<ResponseMessageDto> {
    return this.messagesService.findOne(id);
  }

  //@Delete(':id')
  @Post(':id') // for HTTP DELETE test
  @UseFilters(HttpExceptionFilter)
  remove(@Param('id') id: number): Promise<ResponseMessageDto> {
    return this.messagesService.remove(id);
  }
}
