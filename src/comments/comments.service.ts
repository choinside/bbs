import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from './comment.entity';
import { Message } from '../messages/message.entity';
import { User } from '../users/user.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentsRepository: Repository<Comment>,
  ) {}

  create(createCommentDto: CreateCommentDto): Promise<Comment> {
    const usr = new User();
    usr.id = 1; // Fixed user id

    const msg = new Message();
    msg.id = createCommentDto.msg_id;

    const cmt = new Comment();
    cmt.comment = createCommentDto.comment;
    cmt.user = usr;
    cmt.message = msg;

    return this.commentsRepository.save(cmt);
  }

  async remove(id: string): Promise<void> {
    await this.commentsRepository.delete(id);
  }
}
