import { IEvent } from '@nestjs/cqrs';
import { RateDto } from '../../dtos/rate.dto';

export class UpdateRateEvent implements IEvent {
  constructor(public readonly rateDto: RateDto) {}
}
