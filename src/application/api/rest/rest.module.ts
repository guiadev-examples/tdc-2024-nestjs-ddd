import { AppController } from './app.controller';
import { RouterModule } from '@nestjs/core';
import { routes } from './routes';
import { Module } from '@nestjs/common';
import { SalesModule } from './sales/sales.module';

@Module({
  imports: [RouterModule.register(routes), SalesModule],
  controllers: [AppController],
})
export class RestModule {}
