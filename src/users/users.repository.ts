import { User } from './entity/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateUserDto } from './lib/updateUser.dto';
import { CreateUserDto } from './lib/createUsers.dto';
import { IUser } from './lib/userI';
import { UpdatePassDto } from './lib/updatePass.dto';
import { generatePassword, validPassword } from 'src/auth/utils/auth.utils';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async getUserById(searchValue: number): Promise<User> {
    return this.usersRepository.findOneBy({ id: searchValue });
  }

  async getUserByEmail(searchValue: string): Promise<User> {
    return this.usersRepository.findOneBy({ email: searchValue });
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async deleteUser(user: User): Promise<void> {
    await this.usersRepository.remove(user);
  }

  async updateUser(params: Partial<User>, id: number): Promise<User> {
    const user = await this.getUserById(id);
    return this.usersRepository.save({ ...user, ...params });
  }

  async updateUserPass(params: UpdatePassDto, id: number): Promise<User> {
    const user = await this.getUserById(id);
    const [salt, userHashPassword] = user.password.split('//');
    const isPasswordValid = validPassword(
      params.oldPassword,
      userHashPassword,
      salt,
    );

    if (isPasswordValid == false) {
      throw new HttpException('Wrong password', HttpStatus.UNAUTHORIZED);
    }

    const hashPass = generatePassword(params.password);

    const newPassword = hashPass.salt + '//' + hashPass.hash;
    user.password = newPassword;

    return this.usersRepository.save({ ...user });
  }

  async createUser(user: CreateUserDto): Promise<User> {
    return this.usersRepository.save(user);
  }
}
