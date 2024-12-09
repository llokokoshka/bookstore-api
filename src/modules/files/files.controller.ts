import {
  Controller,
  Post,
  HttpStatus,
  Req,
  UseGuards,
  Body,
  Logger,
  HttpException,
} from '@nestjs/common';

import * as fs from 'fs/promises';

import { editFileName } from './utils/file.utils';
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
  async uploadBase64Filee(
    @Body() body: { base64Data: string; fileType: string; bookId?: number },
    @Req() req,
  ) {
    try {
      const { base64Data, fileType } = body;

      if (!base64Data || !fileType) {
        return {
          status: HttpStatus.BAD_REQUEST,
          message: 'Missing required fields: base64Data or fileType',
        };
      }

      const matches = base64Data.match(/^data:(.+);base64,(.+)$/);
      if (!matches || matches.length !== 3) {
        return {
          status: HttpStatus.BAD_REQUEST,
          message: 'Invalid base64 data',
        };
      }
      const mimeType = matches[1];
      const base64String = matches[2];
      const buffer = Buffer.from(base64String, 'base64');

      let uploadPath = './public/uploads/';
      if (fileType === 'avatar') {
        uploadPath += 'avatars/';
      } else if (fileType === 'book') {
        uploadPath += 'books/';
      } else {
        uploadPath += 'others/';
      }

      const filename: string = editFileName({ mimetype: mimeType });

      const filePath = `${uploadPath}${filename}`;
      await fs.mkdir(uploadPath, { recursive: true });
      await fs.writeFile(filePath, buffer);

      if (fileType === 'avatar') {
        await this.userService.updateUser({ avatar: filename }, req.user.id);
        return {
          status: HttpStatus.OK,
          message: 'Image uploaded successfully!',
          data: { filename },
        };
      } else if (fileType === 'book') {
        await this.booksService.updateBookCover(filename, body.bookId);
        return {
          status: HttpStatus.OK,
          message: 'Book image uploaded successfully!',
          data: { filename },
        };
      }

      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'Invalid file type',
      };
    } catch (err) {
      this.logger.error(err);
      throw new HttpException(
        'File upload failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
