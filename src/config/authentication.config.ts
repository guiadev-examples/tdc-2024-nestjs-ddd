import { registerAs } from '@nestjs/config';
import 'dotenv/config';

export default registerAs('authentication', () => ({
  apiPrivateKey: process.env.API_PRIVATE_KEY,
}));
