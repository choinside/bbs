import { Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { Comment } from '../comments/comment.entity';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @OneToMany(() => Comment, (comment) => comment.message)
  comments: Comment[];

  @ManyToOne(() => User, (user) => user.messages)
  //@JoinColumn()
  user: User;
}
