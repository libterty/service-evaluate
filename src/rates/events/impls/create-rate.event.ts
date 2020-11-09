import { IEvent } from '@nestjs/cqrs';
import { RateDto } from '../../dtos/rate.dto';

export class CreateRateEvent implements IEvent {
  constructor(public readonly rateDto: RateDto) {}
}
