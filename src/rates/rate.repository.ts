import { CreateWhenError, ReadWhenError, UpdateWhenError } from 'libs/error';
import { Repository, EntityRepository, getMongoManager } from 'typeorm';
import { merge } from 'lodash';
import { IFurniture, IPrice, ITransport } from './facilities/facility.dto';
import { Furniture } from './facilities/funiture.entity';
import { Price } from './facilities/price.entity';
import { Transport } from './facilities/transport.entity';
import { IPage, IRateCreate } from './rate.dto';
import { Rate } from './rate.entity';
import { ConflictException, Logger } from '@nestjs/common';

@EntityRepository(Rate)
export class RateRepository extends Repository<Rate> {
  public readonly repoManager = getMongoManager();
  /**
   * @description Get Rate With Pagination
   * @public
   * @param {IPage} searchDto rate search dto
   * @returns {Promise<Rate[]>}
   */
  public async getRates(
    searchDto: IPage,
  ): Promise<{ rates: Rate[]; count: number }> {
    try {
      const take = searchDto.take ? Number(searchDto.take) : 10;
      const skip = searchDto.skip ? Number(searchDto.skip) : 0;

      const [rates, count] = await this.repoManager.findAndCount(Rate, {
        take,
        skip,
        relations: ['furniture', 'price', 'transport'],
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
      vender,
      owner,
      noiseRate,
      locationRate,
      houseConiditionRate,
      houseOwnerRate,
      transport,
      furniture,
      price,
    } = rateDto;
    const rate = new Rate();
    rate.vender = vender;
    rate.owner = owner;
    // fine rate
    rate.noiseRate = noiseRate;
    rate.locationRate = locationRate;
    rate.houseConiditionRate = houseConiditionRate;
    rate.houseOwnerRate = houseOwnerRate;
    // average rate
    rate.averageRate = Math.round(
      (noiseRate + locationRate + houseConiditionRate + houseOwnerRate) / 4,
    );
    // counter
    rate.rateCount = 1;
    try {
      // foregin table
      rate.furniture = await this.createFurniture(furniture);
      rate.transport = await this.createTransport(transport);
      rate.price = await this.createPrice(price);
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
   * @deprecated
   * @public
   * @param {string} id rate primary key
   * @param {IRateCreate} rateDto rate data transfer object
   * @returns {Promise<unknown>}
   */
  async updateRate(id: string, rateDto: IRateCreate): Promise<Rate> {
    try {
      let rate = await Rate.findOne({ where: { id } });
      if (!rate) throw new ConflictException(`Rate ${id} not exists`);

      // deep merge
      rate = merge(rate, rateDto);

      return await rate.save();
    } catch (error) {
      throw new UpdateWhenError(error.message);
    }
  }
}
