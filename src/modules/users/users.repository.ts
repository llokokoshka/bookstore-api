import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { CreateUserDto } from './lib/createUsers.dto';
import { UpdatePassDto } from './lib/updatePass.dto';
import { UserEntity } from './entity/users.entity';
import { AuthUtils } from '../auth/utils/auth.utils';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    private authUtils: AuthUtils,
  ) {}

  async getUserById(searchValue: number): Promise<UserEntity> {
    return this.usersRepository.findOne({
      where: { id: searchValue },
      relations: ['rates', 'rates.book'],
    });
  }

  async getUserByEmail(searchValue: string): Promise<UserEntity> {
    return this.usersRepository.findOne({
      where: { email: searchValue },
      relations: ['rates', 'rates.book'],
    });
  }

  async findAll(): Promise<UserEntity[]> {
    return this.usersRepository.find();
  }

  async deleteUser(user: UserEntity): Promise<void> {
    await this.usersRepository.remove(user);
  }

  async updateUser(
    params: Partial<UserEntity>,
    id: number,
  ): Promise<Partial<UserEntity>> {
    const user = await this.getUserById(id);
    const updatedUser = await this.usersRepository.save({ ...user, ...params });
    return this.authUtils.visibleParamsOfUser(updatedUser);
  }

  async updateUserPass(params: UpdatePassDto, id: number): Promise<UserEntity> {
    const user = await this.getUserById(id);
    const [salt, userHashPassword] = user.password.split('//');
    const isPasswordValid = this.authUtils.validPassword(
      params.password,
      userHashPassword,
      salt,
    );

    if (isPasswordValid == false) {
      throw new HttpException('Wrong password', HttpStatus.FORBIDDEN);
    }
    const hashPass = this.authUtils.generatePassword(params.passwordNew);

    const newPassword = `${hashPass.salt}//${hashPass.hash}`;
    user.password = newPassword;
    const newUserData = await this.usersRepository.save(user);
    delete newUserData.password;
    newUserData.avatar = `http://localhost:4000/uploads/avatars/${newUserData.avatar}`;
    return newUserData;
  }

  async createUser(user: CreateUserDto): Promise<UserEntity> {
    return this.usersRepository.save(user);
  }
}
