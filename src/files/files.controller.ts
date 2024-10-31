import {
  Controller,
  Get,
  Post,
  UseInterceptors,
  UploadedFile,
  Res,
  HttpStatus,
  Req,
  UseGuards,
  Body,
  UploadedFiles,
} from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

import { editFileName, imageFileFilter } from './utils/file.utils';
import { Public } from 'src/auth/decorators/guard.decorator';
import { ReqGetUserDto } from 'src/users/lib/reqGetUser.dto';
import { UsersService } from 'src/users/users.service';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('files')
export class FilesController {
  constructor(private userService: UsersService) {}

  @Post()
  @UseInterceptors(
    AnyFilesInterceptor({
      storage: diskStorage({
        destination: './uploads',
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
    console.log(file.filename);
    await this.userService.updateUser({ avatar: file.filename }, req.user.id);
    return {
      status: HttpStatus.OK,
      message: 'Image uploaded successfully!',
      data: {
        originalname: file.originalname,
        filename: file.filename,
      }
    };
  }

  @Public()
  @Get()
  async getImage(@Req() req: ReqGetUserDto, @Res() res) {
    const userId = req.user.id;
    const user = await this.userService.getUser(userId);
    if (!user || !user.avatar) {
      return res.status(HttpStatus.NOT_FOUND).json({
        status: HttpStatus.NOT_FOUND,
        message: 'User or avatar not found',
      });
    }
    const image = user.avatar;
    const response = res.sendFile(image, { root: './uploads' });
    return {
      status: HttpStatus.OK,
      data: response,
    };
  }
}
