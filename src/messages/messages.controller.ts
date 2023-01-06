import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  ParseIntPipe,
} from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { MessageCommentsDto } from './dto/message-comments.dto';
import { Message } from './message.entity';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  create(@Body() createMessageDto: CreateMessageDto): Promise<Message> {
    return this.messagesService.create(createMessageDto);
  }

  @Post(':id')
  update(@Param('id') id: string, @Body() createMessageDto: CreateMessageDto): Promise<void> {
    return this.messagesService.update(id, createMessageDto);
  }

  @Get()
  findAll(): Promise<Message[]> {
    return this.messagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<MessageCommentsDto> {
    console.log('KENNY findOne()', id);
    const msgcmts = this.messagesService.findOne(id);
    console.log('KENNY', msgcmts);
    
    return msgcmts;
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.messagesService.remove(id);
  }

  //@Post(':id')
  //remove2(@Param('id') id: string): Promise<void> {
  //  return this.messagesService.remove(id);
  //}
}
