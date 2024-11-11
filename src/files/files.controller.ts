import {
  Controller,
  Post,
  UseInterceptors,
  HttpStatus,
  Req,
  UseGuards,
  UploadedFiles,
} from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

import { editFileName, imageFileFilter } from './utils/file.utils';
import { UsersService } from '../users/users.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('files')
export class FilesController {
  constructor(private userService: UsersService) {}

  @UseGuards(AuthGuard)
  @Post()
  @UseInterceptors(
    AnyFilesInterceptor({
      storage: diskStorage({
        destination: './public/uploads',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadedFile(@UploadedFiles() files, @Req() req) {
    if (!files || files.length === 0) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'No file uploaded',
      };
    }
    const file = files[0];
    await this.userService.updateUser({ avatar: file.filename }, req.user.id);
    return {
      status: HttpStatus.OK,
      message: 'Image uploaded successfully!',
      data: {
        originalname: file.originalname,
        filename: file.filename,
      },
    };
  }
}
