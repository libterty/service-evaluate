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
  Vender: string;

  @Column()
  Owner: string;

  @Column()
  AverageRate: number;

  @Column()
  QuiteRate: number;

  @Column()
  LocationRate: number;

  @Column()
  HouseConiditionRate: number;

  @Column()
  HouseOwnerRate: number;

  @Column()
  RateCount: number;

  // 縣市
  @Column()
  TopRegion: number;

  // 區
  @Column()
  SubRegion: number;

  // 經度
  @Column({ nullable: false, type: 'float' })
  Latitude: number;

  // 緯度
  @Column({ nullable: false, type: 'float' })
  Longitude: number;

  @OneToOne(() => Furniture, { cascade: true })
  @JoinColumn()
  Furniture: Furniture;

  @OneToOne(() => Transport, { cascade: true })
  @JoinColumn()
  Transport: Transport;

  @OneToOne(() => Price, { cascade: true })
  @JoinColumn()
  Price: Price;
}
