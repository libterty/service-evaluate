import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Rate } from './rate.entity';
import { RateRepository } from './rate.repository';

@Injectable()
export class RateService {
  constructor(
    @InjectRepository(RateRepository) private rateRepository: RateRepository,
  ) {}
  async getRates(): Promise<Rate[] | Error> {
    try {
      const rates = await this.rateRepository.getRates();
      return rates;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
