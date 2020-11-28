import { Type } from 'class-transformer';
import {
  IsInt,
  IsNumber,
  IsNumberString,
  IsObject,
  IsString,
  Max,
  Min,
} from 'class-validator';
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

  @IsInt()
  rateCount: number;

  @IsObject()
  furniture: IFurniture;

  @IsObject()
  transport: ITransport;

  @IsObject()
  price: IPrice;
}

export class IRateCreate {
  @IsString()
  vender: string;

  @IsString()
  owner: string;

  @IsNumber()
  @Min(0)
  @Max(10)
  noiseRate: number;

  @IsNumber()
  @Min(0)
  @Max(10)
  locationRate: number;

  @IsNumber()
  @Min(0)
  @Max(10)
  houseConiditionRate: number;

  @IsNumber()
  @Min(0)
  @Max(10)
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
