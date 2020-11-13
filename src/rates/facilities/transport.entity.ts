import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Transport {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  bus?: boolean;

  @Column()
  hsr?: boolean;

  @Column()
  publicBike?: boolean;

  @Column()
  subway?: boolean;

  @Column()
  train?: boolean;

  constructor(
    id: number,
    bus?: boolean,
    hsr?: boolean,
    publicBike?: boolean,
    subway?: boolean,
    train?: boolean,
  ) {
    this.id = id;
    this.bus = !!bus ? bus : false;
    this.hsr = !!hsr ? hsr : false;
    this.publicBike = !!publicBike ? publicBike : false;
    this.subway = !!subway ? subway : false;
    this.train = !!train ? train : false;
  }
}
