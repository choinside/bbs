import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Message } from '../messages/message.entity';
import { Comment } from '../comments/comment.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  usr_id: number;

  @Column()
  name: string;

  @OneToMany(() => Message, (message) => message.usr_id)
  messages: Message[];

  @OneToMany(() => Comment, (comment) => comment.usr_id)
  comments: Comment[];
}
