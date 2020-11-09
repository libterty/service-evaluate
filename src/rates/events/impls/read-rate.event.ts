import { IEvent } from '@nestjs/cqrs';

export class ReadRateEvent implements IEvent {
  constructor(
    public readonly rateId?: string,
    public readonly propertyName?: string,
    public readonly propertyOwner?: string,
  ) {}
}
