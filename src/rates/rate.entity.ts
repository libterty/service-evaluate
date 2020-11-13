import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Furniture } from './facilities/funiture.entity';
import { Transport } from './facilities/transport.entity';
import { Price } from './facilities/price.entity';

@Entity()
export class Rate extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  vender: string;

  @Column()
  owner: string;

  @OneToOne(() => Furniture)
  @JoinColumn()
  furniture: Furniture;

  @OneToOne(() => Transport)
  @JoinColumn()
  transport: Transport;

  @OneToOne(() => Price)
  @JoinColumn()
  price: Price;
}
