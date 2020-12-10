import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPage, IRateCreate, IRateMedian } from './rate.dto';
import { Rate } from './rate.entity';
import { RateRepository } from './rate.repository';
import * as address from '../libs/address';
import { APIRequestFactory } from '../libs/request-factory';
import { config } from '../../config';

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
          HttpStatus.BAD_REQUEST,
        );
      if (searchDto.take && !Number.isInteger(searchDto.take))
        return new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: 'Take Must be a Integer',
          },
          HttpStatus.BAD_REQUEST,
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
   * @description Get Rate By Id
   * @public
   * @param {number} id
   * @returns {Promise<Rate | Error>}
   */
  public async getRateById(id: number): Promise<Rate | Error> {
    try {
      const rate = await this.rateRepository.getRateById(id);
      if (!rate)
        return new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: `Rate: ${id} Not Found`,
          },
          HttpStatus.NOT_FOUND,
        );
      return rate;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: `Get Rate: ${id} Error`,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * @description Get Rate Median Service Handler
   * @public
   * @param {IRateMedian} rateMedian
   * @returns {Promise<{ rate_median: number; }[] | Error>}
   */
  public async getRateMedian(
    rateMedian: IRateMedian,
  ): Promise<{ rate_median: number }[] | Error> {
    try {
      const {
        targetSubRegion,
        targetCirculeRadius,
        targetLatitude,
        targetLongitude,
      } = rateMedian;
      if (
        typeof targetSubRegion !== 'number' ||
        typeof targetCirculeRadius !== 'number' ||
        typeof targetLatitude !== 'number' ||
        typeof targetLongitude !== 'number'
      )
        return new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: 'Rate Median parameter must be integer or float',
          },
          HttpStatus.NOT_FOUND,
        );
      return await this.rateRepository.getRateMedian(
        targetSubRegion,
        targetCirculeRadius,
        targetLatitude,
        targetLongitude,
      );
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Get Rates Median Error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // temp func not yet decide interface
  public async getAddressData(addr: string) {
    try {
      const originalAddress: string = addr;
      const resultAddress: string[] = await address.addressConverter(
        addr,
      );
      console.log("resultAddress", resultAddress)

      if (typeof resultAddress !== 'object') return {
        originalAddress,
        resultAddress: resultAddress[0],
        geoResult: [],
      };

      if (resultAddress.length === 0) return {
        originalAddress,
        resultAddress: resultAddress[0],
        geoResult: [],
      };

      const uri = encodeURI(`http://www.mapquestapi.com/geocoding/v1/address?key=${config.GEO_CONFIGS.key}&location=${resultAddress[0]}`)

      const geoResult = await APIRequestFactory.createRequest(
        'standard',
      ).makeRequest({
        method: 'GET',
        uri,
        json: true,
      });

      return {
        originalAddress,
        resultAddress: resultAddress[0],
        geoResult,
      };
    } catch (error) {
      Logger.log(error.message, 'GEO', true);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Get Rates Median Error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * @description Create Rate Entity Service Handler
   * @public
   * @param {IRateCreate} rateDto rate data transfer object
   * @returns {Promise<Rate | Error>}
   */
  public async createRate(rateDto: IRateCreate): Promise<Rate | Error> {
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
   * @public
   * @param {string} id rate primary key
   * @param {IRateCreate} rateDto rate data transfer object
   * @returns {Promise<unknown>}
   */
  public async updateRate(
    id: number,
    rateDto: IRateCreate,
  ): Promise<{ status: string; message: string }> {
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
