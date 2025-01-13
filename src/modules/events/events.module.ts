import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { userConnetionRepository } from './userConnection.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { userConnetionEntity } from './entity/userConnection.entity';

@Module({
  imports: [TypeOrmModule.forFeature([userConnetionEntity])],
  providers: [EventsGateway, userConnetionRepository],
  exports: [userConnetionRepository, EventsGateway],
})
export class EventsModule {}
