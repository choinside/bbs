import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Message } from './message.entity';
import { Comment } from '../comments/comment.entity';
import { MessageCommentsDto } from './dto/message-comments.dto';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private readonly messagesRepository: Repository<Message>,
    @InjectRepository(Comment)
    private readonly commentsRepository: Repository<Comment>,
  ) {}

  create(createMessageDto: CreateMessageDto): Promise<Message> {
    const msg = new Message();
    msg.title = createMessageDto.title;
    msg.description = createMessageDto.description;
    msg.usr_id = 1;

    return this.messagesRepository.save(msg);
  }

  async update(id: string, updateMessageDto: UpdateMessageDto): Promise<void> {
    const result = await this.messagesRepository
      .createQueryBuilder()
      .select()
      .update('message', { ...updateMessageDto })
      .where('msg_id = :id', { id })
      .execute();
    if (result.affected !== 0) {
      //return new BasicMessageDto('Updated Successfully.');
    } //else throw new NotFoundException();
  }

  async findAll(): Promise<Message[]> {
    return this.messagesRepository.find();
  }

  async findOne(msg_id: number): Promise<MessageCommentsDto> {
    const msg = await this.messagesRepository.findOneBy({ msg_id: msg_id });
    const cmts = await this.commentsRepository.find({ where: { msg_id: msg_id } });
    const msgcmts = new MessageCommentsDto(msg, cmts);
    console.log('KENNY3', msgcmts);

    return msgcmts;
  }
  /*async getByBoardId(boardId: number): Promise<BoardInfoResponseDto> {
    const board = await this.boardRepository.findOne(boardId, {
      relations: ['user'],
    });
    if (!!board) {
      const writer = board.user;
      return new BoardInfoResponseDto(writer, board);
    } else throw new NotFoundException('boardId is invalid.');
  }*/

  async remove(id: string): Promise<void> {
    await this.messagesRepository.delete(id);
  }
}
