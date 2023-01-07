import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from './message.entity';
import { Comment } from '../comments/comment.entity';
import { User } from 'src/users/user.entity';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private readonly messagesRepository: Repository<Message>,
    @InjectRepository(Comment)
    private readonly commentsRepository: Repository<Comment>,
  ) {}

  create(createMessageDto: CreateMessageDto): Promise<Message> {
    const usr = new User();
    usr.id = 1; // Fixed user id

    const msg = new Message();
    msg.title = createMessageDto.title;
    msg.description = createMessageDto.description;
    msg.user = usr;

    return this.messagesRepository.save(msg);
  }

  async update(id: number, updateMessageDto: CreateMessageDto): Promise<void> {
    console.log('update()', id, updateMessageDto);
    const msg = await this.messagesRepository.findOneBy({ id: id })
    
    msg.title = updateMessageDto.title;
    msg.description = updateMessageDto.description;
    console.log(updateMessageDto.title, updateMessageDto.description);
    
    await this.messagesRepository.save(msg)
  }

  async findAll(): Promise<Message[]> {
    return this.messagesRepository.find();
  }

  async findOne(msg_id: number): Promise<Message> {
    const msg = await this.messagesRepository.findOne({
      where: {
        id: msg_id,
      },
      relations: {
        comments: true,
      },
    });
    console.log('KENNY', 'findOne()', msg);

    return msg;
  }

  async remove(id: number): Promise<void> {
    console.log('remove()', id);
    //await this.commentsRepository.delete({ {where: {msgId: id}}, });
    //await this.messagesRepository.delete(id);

    const msg = await this.messagesRepository.findOneBy({
      id: id,
    });
    console.log(msg);
    this.messagesRepository.remove(msg);
  }
}
