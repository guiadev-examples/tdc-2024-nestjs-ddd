import * as dotenv from 'dotenv';

export default async () => {
  dotenv.config({ path: 'test/.env.test' });
  dotenv.config();

  process.env.DATABASE_URL = process.env.DATABASE_URL + '-test';
};
