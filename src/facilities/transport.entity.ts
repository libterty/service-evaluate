import { Entity, Column } from 'typeorm';

@Entity()
export class Transport {
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
    bus?: boolean, 
    hsr?: boolean,
    publicBike?: boolean,
    subway?: boolean,
    train?: boolean
  ) {
    this.bus = !!bus ? bus : false;
    this.hsr = !!hsr ? hsr : false;
    this.publicBike = !!publicBike ? publicBike : false;
    this.subway = !!subway ? subway : false;
    this.train = !!train ? train : false;
  }
}