import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { CommentsEntity } from './entity/comments.entity';

@Injectable()
export class CommentsRepository {
  repository: Repository<unknown>;
  constructor(
    @InjectRepository(CommentsEntity)
    private commentsRepository: Repository<CommentsEntity>,
  ) {}

  async createCommentRepository(
    comment: Partial<CommentsEntity>,
  ): Promise<CommentsEntity> {
    if (comment.book === null || comment.user === null) {
      throw new Error('Not full data');
    }
    const newComment = this.commentsRepository.create(comment);
    return this.commentsRepository.save(newComment);
  }

  async findCommentsByBookRepository(
    bookId: number,
  ): Promise<CommentsEntity[]> {
    return this.commentsRepository.find({
      where: { book: { id: bookId } },
      relations: ['user'],
    });
  }
}
