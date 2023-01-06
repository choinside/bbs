import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from './comment.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentsRepository: Repository<Comment>,
  ) {}

  create(createCommentDto: CreateCommentDto): Promise<Comment> {
    const cmt = new Comment();
    cmt.comment = createCommentDto.comment;
    cmt.usr_id = createCommentDto.usr_id;
    cmt.msg_id = createCommentDto.msg_id;

    return this.commentsRepository.save(cmt);
  }

  async findAll(): Promise<Comment[]> {
    return this.commentsRepository.find();
  }

  findOne(msg_id: number): Promise<Comment> {
    return this.commentsRepository.findOneBy({ msg_id: msg_id });
  }

  async remove(id: string): Promise<void> {
    await this.commentsRepository.delete(id);
  }
}
