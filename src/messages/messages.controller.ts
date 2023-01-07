import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from './message.entity';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  create(@Body() createMessageDto: CreateMessageDto): Promise<Message> {
    return this.messagesService.create(createMessageDto);
  }

  @Put(':id')
  //@Post(':id') // for HTTP PUT test
  update(@Param('id') id: number, @Body() updateMessageDto: CreateMessageDto): Promise<void> {
    return this.messagesService.update(id, updateMessageDto);
  }

  @Get()
  findAll(): Promise<Message[]> {
    return this.messagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Message> {
    console.log('KENNY findOne()', id);
    const msg = this.messagesService.findOne(id);
    console.log('KENNY', msg);
    
    return msg;
  }

  //@Delete(':id')
  @Post(':id') // for HTTP DELETE test
  remove(@Param('id') id: number): Promise<void> {
    return this.messagesService.remove(id);
  }
}
