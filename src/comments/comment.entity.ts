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
}
