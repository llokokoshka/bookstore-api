import { User } from './entity/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './lib/updateUser.dto';
import { CreateUserDto } from './lib/createUsers.dto';

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

  async updateUser(params: UpdateUserDto, id: number): Promise<User> {
    const user = await this.getUserById(id);
    return this.usersRepository.save({ ...user, ...params });
  }

  async createUser(user: CreateUserDto): Promise<User> {
    return this.usersRepository.save(user);
  }
}
