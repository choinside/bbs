import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Message } from '../messages/message.entity';
import { User } from '../users/user.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  cmt_id: number;

  @Column()
  comment: string;

  @Column()
  usr_id: number;

  @Column()
  msg_id: number;

  @ManyToOne(() => Message, (message) => message.comments)
  @JoinColumn({ name: 'msg_id' })
  message: Message;

  @ManyToOne(() => User, (user) => user.comments)
  @JoinColumn({ name: 'usr_id' })
  user: User;
}
