import { Module } from '@nestjs/common';
import { RateModule } from './rates/rate.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormConfig } from './config/orm.config';

@Module({
  imports: [TypeOrmModule.forRoot(ormConfig), RateModule],
})
export class AppModule {}
