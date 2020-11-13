import { Controller, Get } from '@nestjs/common';
import { Rate } from './rate.entity';
import { RateService } from './rate.service';

@Controller('rates')
export class RateController {
  constructor(private readonly rateService: RateService) {}

  @Get()
  getRates(): Promise<Rate[] | Error> {
    return this.rateService.getRates();
  }
}
