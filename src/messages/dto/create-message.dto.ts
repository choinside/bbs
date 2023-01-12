import { IsNotEmpty } from "class-validator";
import { Message } from "../message.entity";

export class CreateMessageDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  toMessageEntity() {
    return Message.from(
      this.title,
      this.description,
      1, // Fixed user id
    );
  }
}
