import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity()
export class Furniture extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  refrigerator?: boolean;

  @Column()
  conditioner?: boolean;

  @Column()
  gas?: boolean;

  @Column()
  bed?: boolean;

  @Column()
  desk?: boolean;

  @Column()
  chair?: boolean;

  @Column()
  sofa?: boolean;

  @Column()
  laundry?: boolean;

  @Column()
  heater?: boolean;

  @Column()
  cable?: boolean;

  @Column()
  internet?: boolean;

  @Column()
  wardrobe?: boolean;

  @Column()
  tv?: boolean;

  // constructor(
  //   refrigerator?: boolean,
  //   conditioner?: boolean,
  //   gas?: boolean,
  //   bed?: boolean,
  //   desk?: boolean,
  //   chair?: boolean,
  //   sofa?: boolean,
  //   laundry?: boolean,
  //   heater?: boolean,
  //   cable?: boolean,
  //   internet?: boolean,
  //   wardrobe?: boolean,
  //   tv?: boolean,
  // ) {
  //   this.refrigerator = !!refrigerator ? refrigerator : false;
  //   this.conditioner = !!conditioner ? conditioner : false;
  //   this.gas = !!gas ? gas : false;
  //   this.bed = !!bed ? bed : false;
  //   this.desk = !!desk ? desk : false;
  //   this.chair = !!chair ? chair : false;
  //   this.sofa = !!sofa ? sofa : false;
  //   this.laundry = !!laundry ? laundry : false;
  //   this.heater = !!heater ? heater : false;
  //   this.cable = !!cable ? cable : false;
  //   this.internet = !!internet ? internet : false;
  //   this.wardrobe = !!wardrobe ? wardrobe : false;
  //   this.tv = !!tv ? tv : false;
  // }
}
