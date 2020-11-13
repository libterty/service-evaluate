import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RateRepository } from './rate.repository';
import { RateController } from './rate.controller';
import { RateService } from './rate.service';

@Module({
  imports: [TypeOrmModule.forFeature([RateRepository])],
  controllers: [RateController],
  providers: [RateService],
})
export class RateModule {}
