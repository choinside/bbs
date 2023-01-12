import { ResponseDto } from '../../common/response.dto'
import { Message } from '../message.entity';

export class ResponseMessageDto extends ResponseDto {
  data: Message[];
  data_count: number;
}
