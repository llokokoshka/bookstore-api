import {
  Controller,
  Post,
  UseInterceptors,
  HttpStatus,
  Req,
  UseGuards,
  UploadedFiles,
  Body,
  Logger,
} from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

import { editFileName, imageFileFilter } from './utils/file.utils';
import { UsersService } from '../users/users.service';
import { AuthGuard } from '../auth/auth.guard';
import { BooksService } from 'src/modules/books/books.service';

@Controller('files')
export class FilesController {
  private readonly logger = new Logger(FilesController.name);
  constructor(
    private userService: UsersService,
    private booksService: BooksService,
  ) {}

  @UseGuards(AuthGuard)
  @Post()
  @UseInterceptors(
    AnyFilesInterceptor({
      storage: diskStorage({
        destination: (req, file, cb) => {
          const fileType = req.headers['x-file-type'];
          let uploadPath = './public/uploads/';

          if (fileType === 'avatar') {
            uploadPath += 'avatars';
          } else if (fileType === 'book') {
            uploadPath += 'books';
          } else {
            uploadPath += 'others';
          }
          cb(null, uploadPath);
        },

        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadedFile(@UploadedFiles() files, @Req() req, @Body() body) {
    try {
      if (!files || files.length === 0) {
        return {
          status: HttpStatus.BAD_REQUEST,
          message: 'No file uploaded',
        };
      }
      const file = files[0];
      const fileType = req.headers['x-file-type'];

      if (fileType === 'avatar') {
        await this.userService.updateUser(
          { avatar: file.filename },
          req.user.id,
        );
        return {
          status: HttpStatus.OK,
          message: 'Image uploaded successfully!',
          data: {
            originalname: file.originalname,
            filename: file.filename,
          },
        };
      } else if (fileType === 'book') {
        await this.booksService.updateBookCover(file.filename, body.bookId);
        return {
          status: HttpStatus.OK,
          message: 'Book image uploaded successfully!',
          data: {
            originalname: file.originalname,
            filename: file.filename,
          },
        };
      }

      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'Invalid file type',
      };
    } catch (err) {
      this.logger.error(err);
    }
  }
}
