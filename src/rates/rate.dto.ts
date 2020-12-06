import { IsInt, IsNumber, IsObject, IsString, Max, Min } from 'class-validator';
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
  quiteRate: number;

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
  Vender: string;

  @IsString()
  Owner: string;

  @IsNumber()
  @Min(0)
  @Max(10)
  QuiteRate: number;

  @IsNumber()
  @Min(0)
  @Max(10)
  LocationRate: number;

  @IsNumber()
  @Min(0)
  @Max(10)
  HouseConiditionRate: number;

  @IsNumber()
  @Min(0)
  @Max(10)
  HouseOwnerRate: number;

  @IsNumber()
  TopRegion: number;

  SubRegion?: number;

  @IsNumber()
  Latitude: number;

  @IsNumber()
  Longitude: number;

  @IsObject()
  Furniture: IFurniture;

  @IsObject()
  Transport: ITransport;

  @IsObject()
  Price: IPrice;
}

export interface IPage {
  take?: number;
  skip?: number;
}

export interface IRateSearch extends IPage {
  keyword: string;
}

export interface IRateMedian {
  targetSubRegion: number;
  targetCirculeRadius: number;
  targetLatitude: number;
  targetLongitude: number;
}
