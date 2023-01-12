import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from './message.entity';
import { ResponseMessageDto } from './dto/response-message.dto';
import { Comment } from '../comments/comment.entity';
import { User } from '../users/user.entity';
import { SetMetadata } from '@nestjs/common'
import { ResponseMessage } from '../common/response.dto'

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private readonly messagesRepository: Repository<Message>,
  ) {}

  create(createMessageDto: CreateMessageDto): ResponseMessageDto {
    /*const usr = new User();
    usr.id = 1; // Fixed user id

    const msg = new Message();
    msg.title = createMessageDto.title;
    msg.description = createMessageDto.description;
    msg.user = usr;*/
    const msg = createMessageDto.toMessageEntity();

    //try {
      this.messagesRepository.save(msg);
    //}
    //catch (err) {
    //  ...
    //}

    const res = new ResponseMessageDto();
    res.statusCode = 200;
    res.res_code = 200;
    res.res_msg = ResponseMessage.CREATED;
    res.data = [ msg ];
    res.data_count = 1;
    
    return res;
  }

  async update(id: number, updateMessageDto: CreateMessageDto): Promise<ResponseMessageDto> {
    const msg = await this.messagesRepository.findOneBy({ id: id })

    const res = new ResponseMessageDto();
    res.statusCode = 200;
    res.res_code = 200;

    if (msg != null) {
      msg.title = updateMessageDto.title;
      msg.description = updateMessageDto.description;

      await this.messagesRepository.save(msg);

      res.res_msg = ResponseMessage.SUCCESS;
    }
    else {
      res.res_msg = ResponseMessage.INVALID_BOARD_INFO;
    }    
    
    return res;
  }

  async findAll(): Promise<ResponseMessageDto> {
    const msgs = await this.messagesRepository.find();

    const res = new ResponseMessageDto();
    res.statusCode = 200;
    res.res_code = 200;
    res.res_msg = ResponseMessage.SUCCESS;
    res.data = msgs;
    res.data_count = msgs.length;
    
    return res;
  }

  async findOne(msg_id: number): Promise<ResponseMessageDto> {
    const msg = await this.messagesRepository.findOne({
      where: {
        id: msg_id,
      },
      relations: {
        comments: true,
      },
    });

    const res = new ResponseMessageDto();
    res.statusCode = 200;
    res.res_code = 200;
    res.res_msg = ResponseMessage.SUCCESS;
    res.data = [ msg ];
    res.data_count = 1;

    return res;
  }


  async remove(id: number): Promise<ResponseMessageDto> {
    const msg = await this.messagesRepository.findOneBy({
      id: id,
    });

    const res = new ResponseMessageDto();
    res.statusCode = 200;
    res.res_code = 200;

    if (msg != null) {
      await this.messagesRepository.remove(msg);
      res.res_msg = ResponseMessage.SUCCESS;
    }
    else {
      res.res_msg = ResponseMessage.INVALID_BOARD_INFO;
    }
    
    return res;
  }
}
