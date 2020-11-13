import { Entity, Column } from "typeorm";

@Entity()
export class Price {
  @Column()
  deposit: number;

  @Column()
  monthlyPrice: number;

  @Column()
  managementFee: number;

  @Column()
  parkingFee: number;

  constructor(
    deposit: number,
    monthlyPrice: number,
    managementFee?: number,
    parkingFee?: number
  ) {
    this.deposit = deposit;
    this.monthlyPrice = monthlyPrice;
    this.managementFee = !!managementFee ? managementFee : 0;
    this.parkingFee = !!parkingFee ? parkingFee : 0;
  }
}