import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  ParseIntPipe,
  UseFilters,
} from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { ResponseCommentDto } from './dto/response-comment.dto';
import { Comment } from './comment.entity';
import { CommentsService } from './comments.service';
import { HttpExceptionFilter } from 'src/common/filters/http-exception.filter';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  create(@Body() createCommentDto: CreateCommentDto): ResponseCommentDto {
    return this.commentsService.create(createCommentDto);
  }

  //@Delete(':id')
  @Post(':id') // for HTTP DELETE test
  @UseFilters(HttpExceptionFilter)
  remove(@Param('id') id: string): Promise<ResponseCommentDto> {
    return this.commentsService.remove(id);
  }
}
