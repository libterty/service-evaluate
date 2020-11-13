import { CreateWhenError, ReadWhenError, UpdateWhenError } from 'libs/error';
import { Repository, EntityRepository, getMongoManager } from 'typeorm';
import { merge } from 'lodash';
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
  public async getRates(): Promise<Rate[]> {
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
  private createFurniture(furnitureDto: IFurniture): Furniture {
    return new Furniture(
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
  }

  /**
   * @description Create Transport Entity Repository Handler
   * @private
   * @param {ITransport} transportDto transport data tranfer object
   * @returns {Promise<Transport>}
   */
  private createTransport(transportDto: ITransport): Transport {
    return new Transport(
      transportDto.bus,
      transportDto.hsr,
      transportDto.publicBike,
      transportDto.subway,
      transportDto.train,
    );
  }

  /**
   * @description Create Price Entity Repository Handler
   * @private
   * @param {IPrice} priceDto price data transfer object
   * @returns {Promise<Price>}
   */
  private createPrice(priceDto: IPrice): Price {
    return new Price(
      priceDto.deposit,
      priceDto.monthlyPrice,
      priceDto.managementFee,
      priceDto.parkingFee,
    );
  }

  /**
   * @description Create Rate Entity Repository Handler
   * @public
   * @param {IRate} rateDto rate data transfer object
   * @returns {Promise<Rate | Error>}
   */
  public async createRate(rateDto: IRate): Promise<Rate | Error> {
    try {
      const { vender, owner, transport, furniture, price } = rateDto;
      const rate = new Rate();
      rate.vender = vender;
      rate.owner = owner;
      rate.transport = this.createTransport(transport);
      rate.furniture = this.createFurniture(furniture);
      rate.price = this.createPrice(price);
      return await this.repoManager.save<Rate>(rate);
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
  async updateRate(id: string, rateDto: IRate): Promise<unknown> {
    try {
      return new Promise((resolve, reject) => {
        this.repoManager
          .transaction(transactionManager => {
            return transactionManager
              .createQueryBuilder(Rate, 'Rate')
              .setLock('pessimistic_write')
              .whereInIds(id)
              .getOne()
              .then(existedData => {
                if (!existedData)
                  throw new ReadWhenError(`DB Record ${id} Not Found`);
                const updated_data: IRate = merge(existedData, rateDto);
                return transactionManager
                  .save(updated_data)
                  .then(done => resolve(done));
              });
          })
          .catch(err => reject(err));
      });
    } catch (error) {
      throw new UpdateWhenError(error.message);
    }
  }
}
