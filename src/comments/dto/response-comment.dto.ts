import { ResponseDto } from '../../common/response.dto'
import { Comment } from '../comment.entity';

export class ResponseCommentDto extends ResponseDto {
  data: Comment;
  data_count: number;
}
