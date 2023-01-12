import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from './comment.entity';
import { ResponseCommentDto } from './dto/response-comment.dto'
import { Message } from '../messages/message.entity';
import { User } from '../users/user.entity';
import { ResponseMessage } from 'src/common/response.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentsRepository: Repository<Comment>,
  ) {}

  create(createCommentDto: CreateCommentDto): ResponseCommentDto {
    /*const usr = new User();
    usr.id = 1; // Fixed user id

    const msg = new Message();
    msg.id = createCommentDto.msg_id;

    const cmt = new Comment();
    cmt.comment = createCommentDto.comment;
    cmt.user = usr;
    cmt.message = msg;*/
    const cmt = createCommentDto.toCommentEntity();

    //try {
      this.commentsRepository.save(cmt);
    //}
    //catch (err) {
    //  ...
    //}

    const res = new ResponseCommentDto();
    res.statusCode = 200;
    res.res_code = 200;
    res.res_msg = ResponseMessage.CREATED;
    res.data = cmt;
    res.data_count = 1;
    
    return res;
  }

  async remove(id: string): Promise<ResponseCommentDto> {
    const res = new ResponseCommentDto();
    res.statusCode = 200;
    res.res_code = 200;

    await this.commentsRepository.delete(id);
    res.res_msg = ResponseMessage.SUCCESS;

    return res;
  }
}
