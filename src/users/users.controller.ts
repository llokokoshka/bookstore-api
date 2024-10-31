import {
  Controller,
  Get,
  Patch,
  Post,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  Req,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  ParseFilePipeBuilder,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './lib/updateUser.dto';
import { IVisibleUserParams } from './lib/visibleUserParams.interface';
import { ReqGetUserDto } from './lib/reqGetUser.dto';
import { UserRepository } from './users.repository';
import { User } from './entity/users.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@UseGuards(AuthGuard)
@Controller('user')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private userRepository: UserRepository,
  ) {}

  @Get('me')
  async getUser(@Req() req: ReqGetUserDto): Promise<User> {
    return req.user;
  }

  @Get()
  getAllUsers(): Promise<IVisibleUserParams[]> {
    return this.usersService.findAll();
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number): void {
    this.usersService.deleteUser(id);
  }

  @Patch('me')
  updateUser(
    @Req() req: ReqGetUserDto,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<IVisibleUserParams> {
    return this.usersService.updateUser(updateUserDto, req.user.id);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'jpeg',
        })
        .addMaxSizeValidator({
          maxSize: 1000,
        })
        .build({
          fileIsRequired: false,
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    file: Express.Multer.File,
  ) {
    console.log(file);
  }
}
