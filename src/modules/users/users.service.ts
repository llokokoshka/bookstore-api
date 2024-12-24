import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';

import { UserEntity } from './entity/users.entity';
import { UserRepository } from './users.repository';
import { IVisibleUserParams } from './lib/visibleUserParams.interface';
import { UpdatePassDto } from './lib/updatePass.dto';
import { AuthUtils } from '../auth/utils/auth.utils';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    private userRepository: UserRepository,
    private authUtils: AuthUtils,
  ) {}

  async getUser(id: number): Promise<IVisibleUserParams> {
    try {
      const user = await this.userRepository.getUserById(id);

      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      const correctFormOfUser = this.authUtils.visibleParamsOfUser(user);
      return correctFormOfUser;
    } catch (err) {
      this.logger.error(err);
      throw new HttpException(
        'Unable getting user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getUserForServer(id: number): Promise<UserEntity> {
    try {
      const user = await this.userRepository.getUserById(id);

      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      return user;
    } catch (err) {
      this.logger.error(err);
      throw new HttpException(
        'Unable getting user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(): Promise<IVisibleUserParams[]> {
    try {
      const users = await this.userRepository.findAll();

      if (!users || users.length === 0) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      const visibleParamsOfUsers = users.map((user) =>
        this.authUtils.visibleParamsOfUser(user),
      );

      return visibleParamsOfUsers;
    } catch (err) {
      this.logger.error(err);
      throw new HttpException(
        'Error while getting users',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteUser(id: number): Promise<void> {
    try {
      const user = await this.userRepository.getUserById(id);
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      await this.userRepository.deleteUser(user);
    } catch (err) {
      this.logger.error(err);
      throw new HttpException(
        'User not deleted',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateUser(
    updUser: Partial<UserEntity>,
    id: number,
  ): Promise<Partial<UserEntity>> {
    try {
      const newUser = await this.userRepository.updateUser(updUser, id);
      return newUser;
    } catch (err) {
      this.logger.error(err);
      throw new HttpException(
        'Can`t update user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateUserPass(
    updUser: UpdatePassDto,
    id: number,
  ): Promise<UserEntity> {
    try {
      const newUser = await this.userRepository.updateUserPass(updUser, id);

      return newUser;
    } catch (err) {
      this.logger.error(err);
      throw new HttpException(
        'Can`t update user password',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
