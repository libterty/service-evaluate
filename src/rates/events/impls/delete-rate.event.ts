import { IEvent } from '@nestjs/cqrs';
import { RateIdRequestDto } from '../../dtos/rate.dto';

export class DeleteRateEvent implements IEvent {
  constructor(public readonly rateDto: RateIdRequestDto) {}
}
