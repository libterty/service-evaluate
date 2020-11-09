import { ICommand } from '@nestjs/cqrs';

export class ReadRateCMD implements ICommand {
  constructor(
    public readonly rateId?: string,
    public readonly propertyName?: string,
    public readonly propertyOwner?: string,
  ) {}
}
