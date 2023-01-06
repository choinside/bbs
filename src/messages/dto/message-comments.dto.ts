import { Message } from 'src/messages/message.entity';
import { Comment } from 'src/comments/comment.entity';

export class MessageCommentsDto {
  id: number;
  title: string;
  description: string;
  date: Date;
  comments: Comment[];

  constructor(msg: Message, cmts: Comment[]) {
    this.id = msg.msg_id;
    this.title = msg.title;
    this.description = msg.description;
    this.comments = cmts;
  }
}

/*Example)
{
	"게시글_id":게시글_id,
  "게시글 제목":"안녕하세요.",
  "게시글 내용":"안녕하세요. 처음으로 게시글을 작성합니다...",
  "게시 일시":"202209010915",
	"댓글 리스트":[{"댓글_id":댓글_id,"댓글내용":"반가워요","대댓글 리스트":["대댓글내용":"네 반가워요", ...]},{"댓글_id":댓글_id,"댓글내용":"환영해요~"...}, ...] (대댓글 요소는 선택사항 및 가산점요소).
}*/