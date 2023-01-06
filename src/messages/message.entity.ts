import { Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { Comment } from '../comments/comment.entity';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  msg_id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  usr_id: number;

  @OneToMany(() => Comment, (comment) => comment.msg_id)
  comments: Comment[];

  @ManyToOne(() => User, (user) => user.messages)
  @JoinColumn({ name: 'usr_id' })
  user: User;
}
