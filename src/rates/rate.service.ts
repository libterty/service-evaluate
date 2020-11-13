import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPage, IRate } from './rate.dto';
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
   * @param {IPage} searchDto rate search dto
   * @returns {Promise<Rate[] | Error>}
   */
  public async getRates(
    searchDto: IPage,
  ): Promise<{ rates: Rate[]; count: number } | Error> {
    try {
      if (searchDto.skip && !Number.isInteger(searchDto.skip))
        return new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: 'Skip Must be a Integer',
          },
          HttpStatus.NOT_FOUND,
        );
      if (searchDto.take && !Number.isInteger(searchDto.take))
        return new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: 'Take Must be a Integer',
          },
          HttpStatus.NOT_FOUND,
        );

      const { rates, count } = await this.rateRepository.getRates(searchDto);

      if (!rates || !count)
        return new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: 'Rate Not Found',
          },
          HttpStatus.NOT_FOUND,
        );

      return {
        rates,
        count,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Get Rates Error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
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
      const rate = await this.rateRepository.createRate(rateDto);

      if (typeof rate !== 'object')
        return new HttpException(
          {
            status: HttpStatus.CONFLICT,
            error: 'Rate Creat Fail',
          },
          HttpStatus.CONFLICT,
        );

      return rate;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Create Rate Error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
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
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          error: 'Update Rate Error',
        },
        HttpStatus.CONFLICT,
      );
    }
  }
}
