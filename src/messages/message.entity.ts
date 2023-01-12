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

  static from(
    title: string,
    description: string,
    usr_id: number,
  ) {
    const msg = new Message();
    msg.title = title;
    msg.description = description;
    msg.user = User.from(usr_id);
    return msg;
  }

  static fromId(
    id: number,
  ) {
    const msg = new Message();
    msg.id = id;
    return msg;
  }
}
