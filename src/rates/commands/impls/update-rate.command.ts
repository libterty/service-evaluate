import { ICommand } from '@nestjs/cqrs';
import { RateDto } from '../../dtos/rate.dto';

export class UpdateRateCMD implements ICommand {
  constructor(public readonly rateDto: RateDto) {}
}
