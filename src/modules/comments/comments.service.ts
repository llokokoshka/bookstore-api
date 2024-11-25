import { Injectable, Logger } from '@nestjs/common';

import { CommentsRepository } from './comments.repository';
import { CreateCommentDto } from './lib/createComment.dto';
import { CommentsEntity } from './entity/comments.entity';
import { BookEntity } from 'src/modules/books/entity/books.entity';
import { UserEntity } from 'src/modules/users/entity/users.entity';

@Injectable()
export class CommentsService {
  private readonly logger = new Logger(CommentsService.name);
  constructor(private commentsRepository: CommentsRepository) {}

  async createCommentService(
    Comment: CreateCommentDto,
    book: BookEntity,
    user: UserEntity,
  ): Promise<CommentsEntity> {
    try {
      const comment = await this.commentsRepository.createCommentRepository({
        text: Comment.text,
        book,
        user,
      });
      return comment;
    } catch (err) {
      this.logger.error(err);
    }
  }

  async getCommentsByBookService(bookId: number) {
    try {
      const comments =
        await this.commentsRepository.findCommentsByBookRepository(bookId);
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
    } catch (err) {
      this.logger.error(err);
    }
  }
}
