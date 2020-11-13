import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { IPage, IRate } from './rate.dto';
import { Rate } from './rate.entity';
import { RateService } from './rate.service';

@Controller('rates')
export class RateController {
  constructor(private readonly rateService: RateService) {}

  @Get()
  @UsePipes(ValidationPipe)
  getRates(
    @Query(ValidationPipe) searchDto: IPage,
  ): Promise<{ rates: Rate[]; count: number } | Error> {
    return this.rateService.getRates(searchDto);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createRate(@Body() rateDto: IRate): Promise<Rate | Error> {
    return this.rateService.createRate(rateDto);
  }
}
