import { Comment } from "../comment.entity"
import { IsNotEmpty } from "class-validator";

export class CreateCommentDto {
  @IsNotEmpty()
  private comment: string;

  @IsNotEmpty()
  private msg_id: number;

  toCommentEntity() {
    return Comment.from(
      this.comment,
      1, // Fixed user id
      this.msg_id,
    );
  }
}
