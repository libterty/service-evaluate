/*eslint no-useless-escape: "off"*/
import { execSync } from 'child_process';
import dotenv from 'dotenv';

/**
 * @description Get Package Version
 * @private
 * @returns {string}
 */
const packageVersionGetter = (): string => {
  const version_buffer = execSync(
    `echo $(cat package.json | grep version | head -1 | awk -F: '{ print $2 }' | sed 's/[\",]//g' | tr -d '[[:space:]]')`,
  );
  return version_buffer ? version_buffer.toString() : '1.0.1';
};

/**
 * @description Get Package Name
 * @private
 * @returns {string}
 */
const packageNameGetter = (): string => {
  const name_buffer = execSync(
    `echo $(cat package.json | grep name | head -1 | awk -F: '{ print $2 }' | sed 's/[\",]//g' | tr -d '[[:space:]]')`,
  );
  return name_buffer ? name_buffer.toString() : 'service-evaluate';
};

/**
 * @description Get Package Description
 * @private
 * @returns {string}
 */
const packageDescriptionGetter = (): string => {
  const description_buffer = execSync(
    `echo $(cat package.json | grep description | head -1 | awk -F: '{ print $2 }' | sed 's/[\",]//g' | tr -d '[[:space:]]')`,
  );
  return description_buffer
    ? description_buffer.toString()
    : 'service evaluate open api';
};

// load config
dotenv.config();

const env = process.env.NODE_ENV || 'development';
const configs = {
  base: {
    ENV: env,
    DEV: env === 'development',
    // Pkg Base
    NAME: packageNameGetter(),
    DESCRIPTION: packageDescriptionGetter(),
    // API
    PREFIX: process.env.APP_API_PREFIX || 'v1.*',
    VERSION: packageVersionGetter(),
    API_EXPLORER_PATH: process.env.APP_API_EXPLORER_PATH || '/api',
    // Server Setting
    HOST: process.env.APP_HOST || 'localhost',
    PORT: process.env.APP_PORT || 7070,

    EVENT_STORE_SETTINGS: {
      protocol: process.env.EVENT_STORE_PROTOCOL || 'http',
      hostname: process.env.EVENT_STORE_HOSTNAME || '0.0.0.0',
      tcpPort: process.env.EVENT_STORE_TCP_PORT || 1113,
      httpPort: process.env.EVENT_STORE_HTTP_PORT || 2113,
      credentials: {
        username: process.env.EVENT_STORE_CREDENTIALS_USERNAME || 'lib-test',
        password: process.env.EVENT_STORE_CREDENTIALS_PASSWORD || '12345678',
      },
      poolOptions: {
        min: process.env.EVENT_STORE_POOLOPTIONS_MIN || 1,
        max: process.env.EVENT_STORE_POOLOPTIONS_MAX || 10,
      },
    },

    DB_SETTINGS: {
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_HOST || 27017,
      username: process.env.DB_USERNAME || 'lib',
      password: process.env.DB_PASSWORD || '123',
      database: process.env.DB_DATABASE || 'lib',
    },
  },
  development: {},
  production: {
    PORT: process.env.APP_PORT || 7071,
  },
  test: {
    PORT: 7072,
  },
};

const config = { ...configs.base, ...configs[env] };

export { config };
