import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
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

  @Column(() => Furniture)
  furniture: Furniture;

  @Column(() => Transport)
  transport: Transport;

  @Column(() => Price)
  price: Price;
}
