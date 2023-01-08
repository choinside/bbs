import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from './message.entity';
import { Comment } from '../comments/comment.entity';
import { User } from '../users/user.entity';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private readonly messagesRepository: Repository<Message>,
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
    const msg = await this.messagesRepository.findOneBy({ id: id })
    if (msg == null) {
      throw new InternalServerErrorException('Message not found');
    }
    
    msg.title = updateMessageDto.title;
    msg.description = updateMessageDto.description;
    
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

    return msg;
  }

  async remove(id: number): Promise<void> {
    const msg = await this.messagesRepository.findOneBy({
      id: id,
    });
    if (msg == null) {
      throw new InternalServerErrorException('Message not found');
    }

    this.messagesRepository.remove(msg);
  }
}
