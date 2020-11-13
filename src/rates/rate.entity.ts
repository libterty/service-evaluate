import {
  Entity,
  Column,
  ObjectID,
  ObjectIdColumn,
} from 'typeorm';
import { Furniture } from './facilities/funiture.entity';
import { Transport } from './facilities/transport.entity';
import { Price } from './facilities/price.entity';

@Entity()
export class Rate {
  @ObjectIdColumn()
  id: ObjectID;

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
