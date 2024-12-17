import { extname } from 'path';
import { HttpException, HttpStatus } from '@nestjs/common';

import { Injectable } from '@nestjs/common';

@Injectable()
export class FileUtils {
  constructor() {}
  imageFileFilter = (req, file, callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return callback(
        new HttpException(
          'Only image files are allowed!',
          HttpStatus.BAD_REQUEST,
        ),
        false,
      );
    }
    callback(null, true);
  };

  editFileName = (file) => {
    const fileExtName = extname(file.mimetype);
    const randomName = Array(4)
      .fill(null)
      .map(() => Math.round(Math.random() * 10).toString(10))
      .join('');

    const date = new Date();
    const timestamp = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}-${String(date.getHours()).padStart(2, '0')}${String(date.getMinutes()).padStart(2, '0')}${String(date.getSeconds()).padStart(2, '0')}`;
    return `${timestamp}-${randomName}${fileExtName}`;
  };
}
