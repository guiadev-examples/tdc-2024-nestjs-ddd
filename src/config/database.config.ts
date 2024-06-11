import { registerAs } from '@nestjs/config';
import 'dotenv/config';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export const config: any = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  autoLoadEntities: true,
  ssl:
    process.env.DATABASE_SSL === 'false'
      ? false
      : { rejectUnauthorized: false },
  subscribers: [__dirname + '/../infra/database/**/*.subscriber{.ts,.js}'],
  logging: process.env.DATABASE_LOGGING === 'true',
  logger: process.env.DATABASE_LOGGER || 'advanced-console',
  synchronize: false,
  namingStrategy: new SnakeNamingStrategy(),
  migrationsRun: (process.env.DATABASE_MIGRATION_RUN || 'true') === 'true',
  migrations: [__dirname + '/../infra/database/migrations/**/*{.ts,.js}'],
};

export default registerAs('database', () => ({
  ...config,
}));
