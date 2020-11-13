import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateWhenError, UpdateWhenError } from 'libs/error';
import { IRate } from './rate.dto';
import { Rate } from './rate.entity';
import { RateRepository } from './rate.repository';

@Injectable()
export class RateService {
  constructor(
    @InjectRepository(RateRepository) private rateRepository: RateRepository,
  ) {}

  /**
   * @description Get Rate With Pagination
   * @public
   * @returns {Promise<Rate[] | Error>}
   */
  public async getRates(): Promise<Rate[] | Error> {
    try {
      return await this.rateRepository.getRates();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  /**
   * @description Create Rate Entity Service Handler
   * @public
   * @param {IRate} rateDto rate data transfer object
   * @returns {Promise<Rate | Error>}
   */
  public async createRate(rateDto: IRate): Promise<Rate | Error> {
    try {
      return await this.rateRepository.createRate(rateDto);
    } catch (error) {
      throw new CreateWhenError(error.message);
    }
  }

  /**
   * @description Update Rate By Id
   * @description Not sure if wanted to let user update Rate because rate is kind of transaction log
   * @description And it's a readonly like db for end user
   * @deprecated
   * @public
   * @param {string} id rate primary key
   * @param {IRate} rateDto rate data transfer object
   * @returns {Promise<unknown>}
   */
  public async updateRate(id: string, rateDto: IRate): Promise<unknown> {
    try {
      return await this.rateRepository.updateRate(id, rateDto);
    } catch (error) {
      throw new UpdateWhenError(error.message);
    }
  }
}
