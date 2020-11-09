import { ICommand } from '@nestjs/cqrs';
import { RateIdRequestDto } from '../../dtos/rate.dto';

export class DeleteRateCMD implements ICommand {
  constructor(public readonly rateDto: RateIdRequestDto) {}
}
