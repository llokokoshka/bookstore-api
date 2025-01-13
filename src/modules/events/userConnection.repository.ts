import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { userConnetionEntity } from '../events/entity/userConnection.entity';

@Injectable()
export class userConnetionRepository {
  repository: Repository<userConnetionEntity>;
  constructor(
    @InjectRepository(userConnetionEntity)
    private userConnetionRepository: Repository<userConnetionEntity>,
  ) {}

  async createConnection(userSocketId: string): Promise<userConnetionEntity> {
    const connection = this.userConnetionRepository.create({
      userSocketId,
    });
    return await this.userConnetionRepository.save(connection);
  }

  async removeConnection(userSocketId: string): Promise<void> {
    await this.userConnetionRepository.delete({ userSocketId });
  }

  async findUserSocketId(
    userSocketId: string,
  ): Promise<userConnetionEntity | undefined> {
    return await this.userConnetionRepository.findOne({
      where: { userSocketId },
    });
  }
  async getUserSocketId(): Promise<userConnetionEntity[] | undefined> {
    return await this.userConnetionRepository.find();
  }
}
