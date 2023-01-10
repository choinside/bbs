import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Message } from './message.entity';
import { Comment } from '../comments/comment.entity';
import { MessagesService } from './messages.service';
import { Repository } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMessageDto } from './dto/create-message.dto';
import { User } from '../users/user.entity';

const messageArray = [
  {
	  id: 101,
	  title: "안녕하세요.",
	  description:"안녕하세요. 처음으로 게시글을 작성합니다...",
	},
	{
	  id: 102,
	  title: "반갑습니다.",
	  description: "안녕하세요. 두번째로 게시글을 작성합니다...",
	},
];

const oneMessage = {
  id: '101',
  title: '안녕하세요.',
  description: '안녕하세요. 처음으로 게시글을 작성합니다...',
};

describe('MessagesService', () => {
  let service: MessagesService;
  //let repository: Repository<Message>;

  beforeEach(async () => {
    /*const module: TestingModule = await Test.createTestingModule({
      providers: [
        MessagesService,
        {
          provide: getRepositoryToken(Message),
          useValue: {
            find: jest.fn().mockResolvedValue(messageArray),
            findOneBy: jest.fn().mockResolvedValue(oneMessage),
            save: jest.fn().mockResolvedValue(oneMessage),
            remove: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();*/
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'mysql',
          host: 'localhost',
          port: 3306,
          username: 'root',
          password: 'root1234',
          database: 'test',
          entities: [User, Message, Comment],
          //autoLoadEntities: true,
          synchronize: true,
        }),
        TypeOrmModule.forFeature([User, Message, Comment]),
      ],
      providers: [MessagesService],
    }).compile();

    service = module.get<MessagesService>(MessagesService);
    //repository = module.get<Repository<Message>>(getRepositoryToken(Message));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create()', () => {
    it('should successfully insert a message', async () => {
      const titl_str = '안녕하세요.';
      const desc_str = '안녕하세요. 처음으로 게시글을 작성합니다...';

      const ret = await service.create({
          title: titl_str,
          description: desc_str,
      });

      expect(ret.title).toEqual(titl_str);
      expect(ret.description).toEqual(desc_str);
    });
  });

  /*describe('findAll()', () => {
    it('should return an array of users', async () => {
      const msgs = await service.findAll();
      expect(msgs).toEqual(messageArray);
    });
  });

  describe('findOne()', () => {
    it('should get a single user', () => {
      //const repoSpy = jest.spyOn(repository, 'findOneBy');
      //expect(service.findOne(1)).resolves.toEqual(oneMessage);
      //expect(repoSpy).toBeCalledWith({ id: 1 });
    });
  });

  describe('remove()', () => {
    it('should call remove with the passed value', async () => {
      const removeSpy = jest.spyOn(repository, 'delete');
      const retVal = await service.remove(102);
      //expect(removeSpy).toBeCalledWith(102);
      expect(retVal).toBeUndefined();
    });
  });*/
});
