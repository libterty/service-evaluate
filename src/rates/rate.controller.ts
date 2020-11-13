import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { IRate } from './rate.dto';
import { Rate } from './rate.entity';
import { RateService } from './rate.service';

@Controller('rates')
export class RateController {
  constructor(private readonly rateService: RateService) {}

  @Get()
  getRates(): Promise<Rate[] | Error> {
    return this.rateService.getRates();
  }

  @Post()
  @UsePipes(ValidationPipe)
  createRate(@Body() rateDto: IRate): Promise<Rate | Error> {
    return this.rateService.createRate(rateDto);
  }
}
