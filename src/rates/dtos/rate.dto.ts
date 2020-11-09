import { IsInt, IsString, Matches, Max, Min } from 'class-validator';

export class RateIdRequestDto {
  @IsString({ message: 'Rate Id must be a string type' })
  readonly rateId!: string;
}

export class RateDto {
  @IsString({ message: 'Rate Id must be a string type' })
  readonly rateId!: string;

  @IsString({ message: 'Property Name must be a string type' })
  readonly propertyName!: string;

  @IsString({ message: 'Property Address must be a string type' })
  readonly propertyAddress!: string;

  @IsString({ message: 'Property Owner must be a string type' })
  readonly propertyOwner!: string;

  @IsInt({ message: 'Rating must be a int and should within 0 to 10' })
  @Min(0)
  @Max(10)
  readonly rating: number;

  @IsString({ message: 'Property Phone can only be a string type' })
  @Matches(/((?=(09))[0-9]{10})$/g, { message: 'Invalid Mobile Number' })
  readonly propertyMobile?: string;

  @IsString({ message: 'Property Phone can only be a string type' })
  @Matches(/((?=(0))[0-9]{9})$/g, { message: 'Invalid Home Number' })
  readonly propertyHomeNumber?: string;
}
