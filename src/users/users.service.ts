import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

import { User } from './entity/users.entity';
import { UserRepository } from './users.repository';
import { UpdateUserDto } from './lib/updateUser.dto';
import { IVisibleUserParams } from './lib/visibleUserParams.interface';

@Injectable()
export class UsersService {
  constructor(private userRepository: UserRepository) {}

  async getUser(id: number): Promise<IVisibleUserParams> {
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
      Dob: user.Dob,
    };

    return visibleParamsOfUser;
  }

  async findAll(): Promise<IVisibleUserParams[]> {
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
      Dob: user.Dob,
    }));

    return visibleParamsOfUsers;
  }

  async deleteUser(id: number): Promise<void> {
    const user = await this.userRepository.getUserById(id);
    if (!user) {
      throw new HttpException(
        'users not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    await this.userRepository.deleteUser(user);
  }

  async updateUser(updUser: UpdateUserDto, id: number): Promise<User> {
    const newUser = await this.userRepository.updateUser(updUser, id);

    return newUser;
  }
}
