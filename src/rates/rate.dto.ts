import { IFurniture, ITransport, IPrice } from './facilities/facility.dto';

export interface IRate {
  vender: string;
  owner: string;
  furniture: IFurniture;
  transport: ITransport;
  price: IPrice;
}
