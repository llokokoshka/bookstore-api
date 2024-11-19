import { Body, Controller, Post } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './lib/createComment.dto';
import { CommentsEntity } from './entity/comments.entity';

@Controller('comments')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}
  @Post('create')
  async createComment(
    @Body() comment: CreateCommentDto,
  ): Promise<CommentsEntity> {
    return this.commentsService.createCommentService(comment);
  }
}
