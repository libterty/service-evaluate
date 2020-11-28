import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { IRateCreate } from './rate.dto';
import { Rate } from './rate.entity';
import { RateService } from './rate.service';

@Controller('rates')
export class RateController {
  constructor(private readonly rateService: RateService) {}

  @Get()
  @UsePipes(ValidationPipe)
  getRates(
    @Query(
      'take',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    take: number,
    @Query(
      'skip',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    skip: number,
  ): Promise<{ rates: Rate[]; count: number } | Error> {
    const searchDto = { take, skip };
    return this.rateService.getRates(searchDto);
  }

  @Get('/:id')
  getRateById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Rate | Error> {
    return this.rateService.getRateById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createRate(@Body() rateDto: IRateCreate): Promise<Rate | Error> {
    return this.rateService.createRate(rateDto);
  }
}
