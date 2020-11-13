import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Price {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  deposit: number;

  @Column()
  monthlyPrice: number;

  @Column()
  managementFee: number;

  @Column()
  parkingFee: number;

  constructor(
    id: number,
    deposit: number,
    monthlyPrice: number,
    managementFee?: number,
    parkingFee?: number,
  ) {
    (this.id = id), (this.deposit = deposit);
    this.monthlyPrice = monthlyPrice;
    this.managementFee = !!managementFee ? managementFee : 0;
    this.parkingFee = !!parkingFee ? parkingFee : 0;
  }
}
