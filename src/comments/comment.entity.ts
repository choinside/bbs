import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Message } from '../messages/message.entity';
import { User } from '../users/user.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  comment: string;

  @ManyToOne(() => Message, (message) => message.comments, { onDelete: "CASCADE" })
  //@JoinColumn()
  message: Message;

  @ManyToOne(() => User, (user) => user.comments)
  //@JoinColumn()
  user: User;

  static from(
    cmt_str: string,
    usr_id: number,
    msg_id: number,
  ) {
    const cmt = new Comment();
    cmt.comment = cmt_str;
    cmt.user = User.from(usr_id);
    cmt.message = Message.fromId(msg_id);
    return cmt;
  }
}
