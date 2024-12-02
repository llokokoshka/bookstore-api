import {
  Controller,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  Req,
  UseGuards,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { UpdateUserDto } from './lib/updateUser.dto';
import { IVisibleUserParams } from './lib/visibleUserParams.interface';
import { ReqGetUserDto } from './lib/reqGetUser.dto';
import { UserEntity } from './entity/users.entity';
import { AuthGuard } from 'src/modules/auth/auth.guard';
import { UpdatePassDto } from './lib/updatePass.dto';
import { CreateTokensUtil } from 'src/modules/auth/utils/token.utils';

interface getUserI {
  user: UserEntity;
  access_token: string;
  refresh_token: string;
}

@UseGuards(AuthGuard)
@Controller('user')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private createTokensUtil: CreateTokensUtil,
  ) {}

  @Get('me')
  async getUser(@Req() req: ReqGetUserDto): Promise<getUserI> {
    const payload = { sub: req.user.id, username: req.user.email };
    const { access_token, refresh_token } =
      await this.createTokensUtil.createTokens(payload);
    const user = req.user;
    return { user, access_token, refresh_token };
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
    @Req() req: Partial<ReqGetUserDto>,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    return this.usersService.updateUser(updateUserDto, req.user.id);
  }

  @Patch('pass')
  updateUserPass(
    @Req() req: ReqGetUserDto,
    @Body() updatePassDto: UpdatePassDto,
  ): Promise<UserEntity> {
    return this.usersService.updateUserPass(updatePassDto, req.user.id);
  }
}
