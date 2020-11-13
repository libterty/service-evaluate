import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config } from '../../config';

export const ormConfig: TypeOrmModuleOptions = {
  type: 'mongodb',
  host: config.DB_SETTINGS.host,
  port: config.DB_SETTINGS.port,
  database: config.DB_SETTINGS.database,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
};
