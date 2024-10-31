import {
  Controller,
  Get,
  Post,
  UseInterceptors,
  UploadedFile,
  Res,
  Param,
  HttpStatus,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

import { editFileName, imageFileFilter } from './utils/file.utils';
import { Public } from 'src/auth/decorators/guard.decorator';

@Controller('files')
export class FilesController {
  constructor() {}

  @Public()
  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadedFile(@UploadedFile() file) {
    const response = {
      originalname: file.originalname,
      filename: file.filename,
    };
    return {
      status: HttpStatus.OK,
      message: 'Image uploaded successfully!',
      data: response,
    };
  }

  @Public()
  @Get(':imagename')
  getImage(@Param('imagename') image, @Res() res) {
    const response = res.sendFile(image, { root: './uploads' });
    return {
      status: HttpStatus.OK,
      data: response,
    };
  }
}
