import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';

import { UserEntity } from './entity/users.entity';
import { UserRepository } from './users.repository';
import { IVisibleUserParams } from './lib/visibleUserParams.interface';
import { UpdatePassDto } from './lib/updatePass.dto';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(private userRepository: UserRepository) { }

  async getUser(id: number): Promise<IVisibleUserParams> {
    try {
      const user = await this.userRepository.getUserById(id);

      if (!user) {
        throw new HttpException(
          'user not found',
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
      const visibleParamsOfUser = {
        fullName: user.fullName,
        email: user.email,
        avatar: user.avatar,
        rating: user.rates,
      };

      return visibleParamsOfUser;
    } catch (err) {
      this.logger.error(err);
    }
  }

  async getUserForServer(id: number): Promise<UserEntity> {
    try {
      const user = await this.userRepository.getUserById(id);

      if (!user) {
        throw new HttpException(
          'user not found',
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }

      return user;
    } catch (err) {
      this.logger.error(err);
    }
  }

  async findAll(): Promise<IVisibleUserParams[]> {
    try {
      const users = await this.userRepository.findAll();

      if (!users || users.length === 0) {
        throw new HttpException(
          'users not found',
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }

      const visibleParamsOfUsers = users.map((user) => ({
        fullName: user.fullName,
        email: user.email,
        avatar: user.avatar,
        rating: user.rates,
      }));

      return visibleParamsOfUsers;
    } catch (err) {
      this.logger.error(err);
    }
  }

  async deleteUser(id: number): Promise<void> {
    try {
      const user = await this.userRepository.getUserById(id);
      if (!user) {
        throw new HttpException(
          'users not found',
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
      await this.userRepository.deleteUser(user);
    } catch (err) {
      this.logger.error(err);
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
    }
  }
}
