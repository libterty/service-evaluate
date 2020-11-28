import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  BaseEntity,
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

  @Column()
  averageRate: number;

  @Column()
  noiseRate: number;

  @Column()
  locationRate: number;

  @Column()
  houseConiditionRate: number;

  @Column()
  houseOwnerRate: number;

  @Column()
  rateCount: number;

  @OneToOne(() => Furniture, { cascade: true })
  @JoinColumn()
  furniture: Furniture;

  @OneToOne(() => Transport, { cascade: true })
  @JoinColumn()
  transport: Transport;

  @OneToOne(() => Price, { cascade: true })
  @JoinColumn()
  price: Price;
}
