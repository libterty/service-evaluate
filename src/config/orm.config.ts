import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config } from '../../config';

export const ormConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: config.DB_SETTINGS.host,
  port: config.DB_SETTINGS.port,
  username: config.DB_SETTINGS.username,
  password: config.DB_SETTINGS.password,
  database: config.DB_SETTINGS.database,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  migrations: [__dirname + './migration/*.ts'],
  synchronize: true,
};
