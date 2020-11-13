import { CreateWhenError, ReadWhenError } from 'libs/error';
import { Repository, EntityRepository, getMongoManager } from 'typeorm';
import { IFurniture, IPrice, ITransport } from './facilities/facility.dto';
import { Furniture } from './facilities/funiture.entity';
import { Price } from './facilities/price.entity';
import { Transport } from './facilities/transport.entity';
import { IRate } from './rate.dto';
import { Rate } from './rate.entity';

@EntityRepository(Rate)
export class RateRepository extends Repository<Rate> {
  public readonly repoManager = getMongoManager();
  /**
   * @description Get Rate With Pagination
   * @public
   * @returns {Promise<Rate[]>}
   */
  async getRates(): Promise<Rate[]> {
    try {
      const rates: Rate[] = await this.repoManager.find(Rate);
      return rates;
    } catch (error) {
      throw new ReadWhenError(error.message);
    }
  }

  /**
   * @description Create Furniture Entity Repository Handler
   * @private
   * @param {IFurniture} furnitureDto furniture data tranfer object
   * @returns {Promise<Furniture>}
   */
  async createFurniture(furnitureDto: IFurniture): Promise<Furniture> {
    try {
      const furniture = new Furniture(
        furnitureDto.refrigerator,
        furnitureDto.conditioner,
        furnitureDto.gas,
        furnitureDto.bed,
        furnitureDto.desk,
        furnitureDto.chair,
        furnitureDto.sofa,
        furnitureDto.laundry,
        furnitureDto.heater,
        furnitureDto.cable,
        furnitureDto.internet,
        furnitureDto.wardrobe,
        furnitureDto.tv,
      );
      return await this.repoManager.save(furniture);
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
  async createTransport(transportDto: ITransport): Promise<Transport> {
    try {
      const transport = new Transport(
        transportDto.bus,
        transportDto.hsr,
        transportDto.publicBike,
        transportDto.subway,
        transportDto.train,
      );
      return await this.repoManager.save(transport);
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
  async createPrice(priceDto: IPrice): Promise<Price> {
    try {
      const price = new Price(
        priceDto.deposit,
        priceDto.monthlyPrice,
        priceDto.managementFee,
        priceDto.parkingFee,
      );
      return await this.repoManager.save(price);
    } catch (error) {
      throw new CreateWhenError(error.message);
    }
  }

  /**
   * @description Create Rate Entity Repository Handler
   * @public
   * @param {IRate} rateDto rate data transfer object
   * @returns {Promise<Rate>}
   */
  async createRate(rateDto: IRate): Promise<Rate> {
    try {
      const { vender, owner, transport, furniture, price } = rateDto;
      const rate = new Rate();
      rate.vender = vender;
      rate.owner = owner;
      rate.transport = await this.createTransport(transport);
      rate.furniture = await this.createFurniture(furniture);
      rate.price = await this.createPrice(price);
      return await this.repoManager.save(rate);
    } catch (error) {
      throw new CreateWhenError(error.message);
    }
  }
}
