import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateWhenError } from 'libs/error';
import { IRate } from './rate.dto';
import { Rate } from './rate.entity';
import { RateRepository } from './rate.repository';

@Injectable()
export class RateService {
  constructor(
    @InjectRepository(RateRepository) private rateRepository: RateRepository,
  ) {}

  /**
   * @description Get Rates By Pagination
   */
  async getRates(): Promise<Rate[] | Error> {
    try {
      const rates = await this.rateRepository.getRates();
      return rates;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async createRate(rateDto: IRate): Promise<Rate | Error> {
    try {
      return await this.rateRepository.createRate(rateDto);
    } catch (error) {
      throw new CreateWhenError(error.message);
    }
  }
}
