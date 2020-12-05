import { CreateWhenError, ReadWhenError, UpdateWhenError } from 'libs/error';
import { Repository, EntityRepository, getManager } from 'typeorm';
import { IFurniture, IPrice, ITransport } from './facilities/facility.dto';
import { Furniture } from './facilities/funiture.entity';
import { Price } from './facilities/price.entity';
import { Transport } from './facilities/transport.entity';
import { IPage, IRateCreate } from './rate.dto';
import { Rate } from './rate.entity';
import { ConflictException, Logger } from '@nestjs/common';
import { isEmptyObj } from '../libs/utils';
import { config } from '../../config';

@EntityRepository(Rate)
export class RateRepository extends Repository<Rate> {
  public readonly repoManager = getManager();
  /**
   * @description Get Rate With Pagination
   * @public
   * @param {IPage} searchDto rate search dto
   * @returns {Promise<Rate[]>}
   */
  public async getRates(
    searchDto: IPage,
  ): Promise<{ rates: Rate[]; count: number }> {
    const take = searchDto.take ? Number(searchDto.take) : 10;
    const skip = searchDto.skip ? Number(searchDto.skip) : 0;
    try {
      const [rates, count] = await this.repoManager.findAndCount(Rate, {
        take,
        skip,
        relations: ['Furniture', 'Price', 'Transport'],
      });
      return {
        rates,
        count,
      };
    } catch (error) {
      Logger.log(error.message, 'GetRates', true);
      throw new ReadWhenError(error.message);
    }
  }

  /**
   * @description Get Rate By Id
   * @public
   * @param {number} id
   * @returns {Promise<Rate>}
   */
  public async getRateById(id: number): Promise<Rate> {
    const query = this.createQueryBuilder('rate');
    query.leftJoinAndSelect('rate.furniture', 'furniture');
    query.leftJoinAndSelect('rate.transport', 'transport');
    query.leftJoinAndSelect('rate.price', 'price');
    query.andWhere('rate.id = :id', { id });
    try {
      return await query.getOne();
    } catch (error) {
      Logger.log(error.message, 'GetRateById', true);
      throw new ReadWhenError(error.message);
    }
  }

  /**
   * @description Get Rate Median by AverageRate Column by using `PERCENTILE_CONT`. `PERCENTILE_CONT` use linear interpolation to find result in a continuous distribution
   * @public
   * @returns {Promise<{ rate_median: number }[]>}
   */
  public async getRateMedian(): Promise<{ rate_median: number }[]> {
    return new Promise((resolve, reject) => {
      this.repoManager
        .query(
          `
          SELECT  
            ROUND(PERCENTILE_CONT(0.50) WITHIN GROUP (ORDER BY "AverageRate")::numeric, 2) AS rate_median
          FROM ${config.DB_SETTINGS.schema}.${config.DB_SETTINGS.rateTable}
          WHERE "AverageRate" <> 0; 
        `,
        )
        .then(res => resolve(res))
        .catch(err => reject(err.message));
    });
  }

  /**
   * @description Create Furniture Entity Repository Handler
   * @private
   * @param {IFurniture} furnitureDto furniture data tranfer object
   * @returns {Promise<Furniture>}
   */
  private async createFurniture(furnitureDto: IFurniture): Promise<Furniture> {
    const {
      refrigerator,
      conditioner,
      gas,
      bed,
      desk,
      chair,
      sofa,
      laundry,
      heater,
      cable,
      internet,
      wardrobe,
      tv,
    } = furnitureDto;
    const furniture = new Furniture();
    furniture.refrigerator = !!refrigerator ? refrigerator : false;
    furniture.conditioner = !!conditioner ? conditioner : false;
    furniture.gas = !!gas ? gas : false;
    furniture.bed = !!bed ? bed : false;
    furniture.desk = !!desk ? desk : false;
    furniture.chair = !!chair ? chair : false;
    furniture.sofa = !!sofa ? sofa : false;
    furniture.laundry = !!laundry ? laundry : false;
    furniture.heater = !!heater ? heater : false;
    furniture.cable = !!cable ? cable : false;
    furniture.internet = !!internet ? internet : false;
    furniture.wardrobe = !!wardrobe ? wardrobe : false;
    furniture.tv = !!tv ? tv : false;
    try {
      return await furniture.save();
    } catch (error) {
      throw new CreateWhenError(error.message);
    }
  }

  /**
   * @description Create Transport Entity Repository Handler
   * @private
   * @param {ITransport} transportDto transport data tranfer object
   * @returns {Promise<Transport>}
   */
  private async createTransport(transportDto: ITransport): Promise<Transport> {
    const { bus, hsr, publicBike, subway, train } = transportDto;
    const transport = new Transport();
    transport.bus = !!bus ? bus : false;
    transport.hsr = !!hsr ? hsr : false;
    transport.publicBike = !!publicBike ? publicBike : false;
    transport.subway = !!subway ? subway : false;
    transport.train = !!train ? train : false;
    try {
      return await transport.save();
    } catch (error) {
      throw new CreateWhenError(error.message);
    }
  }

  /**
   * @description Create Price Entity Repository Handler
   * @private
   * @param {IPrice} priceDto price data transfer object
   * @returns {Promise<Price>}
   */
  private async createPrice(priceDto: IPrice): Promise<Price> {
    const { deposit, monthlyPrice, managementFee, parkingFee } = priceDto;
    const price = new Price();
    price.deposit = deposit;
    price.monthlyPrice = monthlyPrice;
    price.managementFee = !!managementFee ? managementFee : 0;
    price.parkingFee = !!parkingFee ? parkingFee : 0;
    try {
      return await price.save();
    } catch (error) {
      throw new CreateWhenError(error.message);
    }
  }

  /**
   * @description Create Rate Entity Repository Handler
   * @public
   * @param {IRateCreate} rateDto rate data transfer object
   * @returns {Promise<Rate | Error>}
   */
  public async createRate(rateDto: IRateCreate): Promise<Rate> {
    const {
      Vender,
      Owner,
      QuiteRate,
      LocationRate,
      HouseConiditionRate,
      HouseOwnerRate,
      TopRegion,
      SubRegion,
      Latitude,
      Longitude,
      Transport,
      Furniture,
      Price,
    } = rateDto;
    const rate = new Rate();
    rate.Vender = Vender;
    rate.Owner = Owner;
    // fine rate
    rate.QuiteRate = QuiteRate;
    rate.LocationRate = LocationRate;
    rate.HouseConiditionRate = HouseConiditionRate;
    rate.HouseOwnerRate = HouseOwnerRate;
    // location data
    rate.TopRegion = TopRegion;
    rate.SubRegion = SubRegion ? SubRegion : 0;
    rate.Latitude = Latitude;
    rate.Longitude = Longitude;
    // average rate
    rate.AverageRate = Math.round(
      (QuiteRate + LocationRate + HouseConiditionRate + HouseOwnerRate) / 4,
    );
    // counter
    rate.RateCount = 1;
    try {
      // foregin table
      rate.Furniture = await this.createFurniture(Furniture);
      rate.Transport = await this.createTransport(Transport);
      rate.Price = await this.createPrice(Price);
      // rate table
      return await rate.save();
    } catch (error) {
      Logger.log(error.message, 'Create', true);
      throw new CreateWhenError(error.message);
    }
  }

  /**
   * @description Update Rate By Id
   * @description Not sure if wanted to let user update Rate because rate is kind of transaction log
   * @description And it's a readonly like db for end user
   * @public
   * @param {number} id rate primary key
   * @param {IRateCreate} rateDto rate data transfer object
   * @returns {Promise<unknown>}
   */
  async updateRate(
    id: number,
    rateDto: IRateCreate,
  ): Promise<{ status: string; message: string }> {
    try {
      const rate = await Rate.findOne({
        where: { id },
        relations: ['furniture', 'price', 'transport'],
      });
      if (!rate) throw new ConflictException(`Rate ${id} not exists`);

      const newRate = Object.assign(rate, rateDto);
      const updateRate = {
        Vender: newRate.Vender,
        Owner: newRate.Owner,
        AverageRate: newRate.AverageRate,
        QuiteRate: newRate.QuiteRate,
        LocationRate: newRate.LocationRate,
        HouseConiditionRate: newRate.HouseConiditionRate,
        HouseOwnerRate: newRate.HouseOwnerRate,
        RateCount: newRate.RateCount,
        TopRegion: newRate.TopRegion,
        SubRegion: newRate.SubRegion,
        Latitude: newRate.Latitude,
        Longitude: newRate.Longitude,
      };

      if (!isEmptyObj(rateDto.Transport) && rate.Transport.id) {
        await this.createQueryBuilder()
          .update(Transport)
          .set(
            Object.assign(
              rate.Transport ? rate.Transport : {},
              rateDto.Transport,
            ),
          )
          .andWhere('id = :id', { id: rate.Transport.id })
          .execute();
      } else if (!isEmptyObj(rateDto.Transport) && !rate.Transport.id) {
        updateRate['Transport'] = await this.createTransport(rateDto.Transport);
      }

      if (!isEmptyObj(rateDto.Price) && rate.Price.id) {
        await this.createQueryBuilder()
          .update(Price)
          .set(Object.assign(rate.Price ? rate.Price : {}, rateDto.Price))
          .andWhere('id = :id', { id: rate.Price.id })
          .execute();
      } else if (!isEmptyObj(rateDto.Price) && !rate.Price.id) {
        updateRate['Price'] = await this.createPrice(rateDto.Price);
      }

      if (!isEmptyObj(rateDto.Furniture) && rate.Furniture.id) {
        await this.createQueryBuilder()
          .update(Furniture)
          .set(
            Object.assign(
              rate.Furniture ? rate.Furniture : {},
              rateDto.Furniture,
            ),
          )
          .andWhere('id = :id', { id: rate.Furniture.id })
          .execute();
      } else if (!isEmptyObj(rateDto.Furniture) && !rate.Furniture.id) {
        updateRate['Furniture'] = await this.createFurniture(rateDto.Furniture);
      }

      await this.createQueryBuilder()
        .update(Rate)
        .set(updateRate)
        .andWhere('id = :id', { id })
        .execute();

      return {
        status: 'success',
        message: `Update Rate: ${id} success`,
      };
    } catch (error) {
      Logger.log(error.message, 'UpdateRate', true);
      throw new UpdateWhenError(error.message);
    }
  }
}
