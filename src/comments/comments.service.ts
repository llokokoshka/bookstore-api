import { Injectable } from '@nestjs/common';

import { CommentsRepository } from './comments.repository';
import { CreateCommentDto } from './lib/createComment.dto';
import { CommentsEntity } from './entity/comments.entity';
import { BookEntity } from 'src/books/entity/books.entity';
import { UserEntity } from 'src/users/entity/users.entity';

@Injectable()
export class CommentsService {
  constructor(private commentsRepository: CommentsRepository) {}

  async createCommentService(
    Comment: CreateCommentDto,
    book: BookEntity,
    user: UserEntity,
  ): Promise<CommentsEntity> {
    const comment = await this.commentsRepository.createCommentRepository({
      text: Comment.text,
      book,
      user,
    });
    return comment;
  }

  async getCommentsByBookService(bookId: number) {
    const comments =
      await this.commentsRepository.findCommentsByBookRepository(bookId);
    // if (!comments) {
    //   return 'No comments';
    // }
    const correctComments = comments.map((comment) => ({
      id: comment.id,
      text: comment.text,
      dateOfCreate: comment.dateOfCreate,
      user: {
        id: comment.user.id,
        fullName: comment.user.fullName,
        avatar: comment.user.avatar,
      },
    }));
    return correctComments;
  }
}
