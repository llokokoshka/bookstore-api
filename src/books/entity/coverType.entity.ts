import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { CoverEntity } from './covers.entity';

@Entity()
export class CoverTypeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  type: string;

  @ManyToOne(() => CoverEntity, (cover) => cover.coverTypes)
  cover: CoverEntity;
}
