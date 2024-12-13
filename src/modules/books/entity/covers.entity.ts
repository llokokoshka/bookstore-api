import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class CoverEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 0 })
  paperback_price: number;

  @Column({ default: 0 })
  paperback_amount: number;

  @Column({ default: 0 })
  hardcover_price: number;

  @Column({ default: 0 })
  hardcover_amount: number;
}
