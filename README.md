## 요구사항

1. 게시글 등록 [완료] http://localhost:3000/createMessage.html (테스트용 입력 페이지)
2. 게시글 수정 [완료] http://localhost:3000/updateMessage.html
3. 게시글 삭제 [완료] http://localhost:3000/deleteMessage.html
4. 게시글 목록 
- 게시글 목록 [완료] http://localhost:3000/messages
- 게시글 검색 [미구현]
5. 댓글 등록 [완료] http://localhost:3000/createComment.html
6. 댓글 삭제 [완료] http://localhost:3000/deleteComment.html
7. 게시글 상세 [완료] http://localhost:3000/messages/2

* 대댓글 등록/삭제/표시 [미구현]
* Unit Test [진행중] (src/messages/messages.service.spec.ts)

## Entity Relationship

```bash
user 1:N message
user 1:N comment
message 1:N comment

user (src/users/user.entity.ts)
+-------+--------------+------+-----+---------+----------------+
| Field | Type         | Null | Key | Default | Extra          |
+-------+--------------+------+-----+---------+----------------+
| id    | int(11)      | NO   | PRI | NULL    | auto_increment |
| name  | varchar(255) | NO   |     | NULL    |                |
+-------+--------------+------+-----+---------+----------------+

message (src/messages/message.entity.ts)
+-------------+--------------+------+-----+---------+----------------+
| Field       | Type         | Null | Key | Default | Extra          |
+-------------+--------------+------+-----+---------+----------------+
| id          | int(11)      | NO   | PRI | NULL    | auto_increment |
| title       | varchar(255) | NO   |     | NULL    |                |
| description | varchar(255) | NO   |     | NULL    |                |
| userId      | int(11)      | YES  | MUL | NULL    |                |
+-------------+--------------+------+-----+---------+----------------+

comment (src/comments/comment.entity.ts)
+-----------+--------------+------+-----+---------+----------------+
| Field     | Type         | Null | Key | Default | Extra          |
+-----------+--------------+------+-----+---------+----------------+
| id        | int(11)      | NO   | PRI | NULL    | auto_increment |
| comment   | varchar(255) | NO   |     | NULL    |                |
| userId    | int(11)      | YES  | MUL | NULL    |                |
| messageId | int(11)      | YES  | MUL | NULL    |                |
+-----------+--------------+------+-----+---------+----------------+
```

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
