import { LogLevel } from '@nestjs/common';
import { registerAs } from '@nestjs/config';

export default registerAs('application', () => ({
  name: 'ecommerce-service',
  description:
    'Guia Dev - Backend de serviço com as implementações referentes ao projeto de exemplo de NestJS + DDD para um domínio de ecommerce.',
  nodeEnv: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT, 10) || 3000,
  logLevel: (process.env.LOG_LEVEL || 'verbose').split(',') as LogLevel[],

  //Helpers
  isDevelopment(): boolean {
    return this.nodeEnv === 'development';
  },

  isTest(): boolean {
    return this.nodeEnv === 'test';
  },

  isProduction(): boolean {
    return this.nodeEnv === 'production';
  },
}));
