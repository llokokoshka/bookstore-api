import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class userConnetionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userSocketId: string;

  @CreateDateColumn()
  connectedAt: Date;
}
