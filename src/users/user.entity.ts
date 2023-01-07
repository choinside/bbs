import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Message } from '../messages/message.entity';
import { Comment } from '../comments/comment.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Message, (message) => message.user)
  messages: Message[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];
}
