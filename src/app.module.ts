import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { MessagesModule } from './messages/messages.module';
import { CommentsModule } from './comments/comments.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { Comment } from './comments/comment.entity';
import { Message } from './messages/message.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root1234',
      database: 'test',
      autoLoadEntities: true,
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Message, Comment]),
    UsersModule,
    MessagesModule,
    CommentsModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
