import { config } from '@config/database.config';
import { DataSource } from 'typeorm';

const extraConfig = {
  ...config,
  url: process.env.NODE_ENV == 'test' ? `${config.url}-test` : config.url,
  entities: [__dirname + '/../../../src/**/*.entity{.ts,.js}'],
  migrations: [
    __dirname + '/../../../src/infra/database/migrations/**/*{.ts,.js}',
  ],
};

const datasource = new DataSource(extraConfig);
export default datasource;
