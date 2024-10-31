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
    console.log(files.filename);
    await this.userService.updateUser({ avatar: files.filename }, req.user.id);
    const response = {
      originalname: files.originalname,
      filename: files.filename,
    };
    return {
      status: HttpStatus.OK,
      message: 'Image uploaded successfully!',
      data: response,
    };
  }

  @Public()
  @Get()
  async getImage(@Req() req: ReqGetUserDto, @Res() res) {
    const userId = req.user.id;
    const user = await this.userService.getUser(userId);
    const image = user.avatar;
    const response = res.sendFile(image, { root: './uploads' });
    return {
      status: HttpStatus.OK,
      data: response,
    };
  }
}
