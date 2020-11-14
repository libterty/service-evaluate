import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { RateModule } from './rates/rate.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormConfig } from './config/orm.config';
import { RateMiddleware } from 'middlewares/rate-limit';

@Module({
  imports: [TypeOrmModule.forRoot(ormConfig), RateModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RateMiddleware).forRoutes('*');
  }
}
