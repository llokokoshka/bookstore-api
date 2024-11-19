import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './lib/createComment.dto';
import { CommentsEntity } from './entity/comments.entity';
import { BooksService } from 'src/books/books.service';
import { UsersService } from 'src/users/users.service';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('comments')
export class CommentsController {
  constructor(
    private commentsService: CommentsService,
    private bookService: BooksService,
    private userService: UsersService,
  ) {}

  @Post()
  async createComment(@Body() dto: CreateCommentDto): Promise<CommentsEntity> {
    const user = await this.userService.getUserForServer(dto.userId);
    const book = await this.bookService.getBookService(dto.bookId);

    return this.commentsService.createCommentService(dto, book, user);
  }

  @Get(':bookId')
  async getComments(@Param('bookId') bookId: number) {
    return this.commentsService.getCommentsByBookService(bookId);
  }
}
