import { Repository, EntityRepository, getManager } from 'typeorm';
import { Rate } from "./rate.entity";

@EntityRepository(Rate)
export class RateRepository extends Repository<Rate> {
  async getRates(): Promise<Rate[]> {
    try {
      const rateRepo = getManager();
      const rates: Rate[] = await rateRepo.find(Rate);
      return rates;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}