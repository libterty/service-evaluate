import { IsInt, IsObject, IsString, Max, Min } from 'class-validator';
import { IFurniture, ITransport, IPrice } from './facilities/facility.dto';

export class IRate {
  @IsString()
  vender: string;
  @IsString()
  owner: string;
  @Min(0)
  @Max(10)
  @IsInt()
  averageRate: number;

  @Min(0)
  @Max(10)
  @IsInt()
  noiseRate: number;

  @Min(0)
  @Max(10)
  @IsInt()
  locationRate: number;

  @Min(0)
  @Max(10)
  @IsInt()
  houseConiditionRate: number;

  @Min(0)
  @Max(10)
  @IsInt()
  houseOwnerRate: number;

  @IsObject()
  furniture: IFurniture;

  @IsObject()
  transport: ITransport;

  @IsObject()
  price: IPrice;
}

export interface IPage {
  take?: number;
  skip?: number;
}

export interface IRateSearch extends IPage {
  keyword: string;
}
