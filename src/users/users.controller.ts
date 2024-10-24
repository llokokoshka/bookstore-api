import {
  Controller,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './lib/updateUser.dto';
import { IVisibleUserParams } from './lib/visibleUserParams.interface';
import { ReqGetUserDto } from './lib/reqGetUser.dto';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  getUser(@Req() req: ReqGetUserDto): IVisibleUserParams {
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
}
