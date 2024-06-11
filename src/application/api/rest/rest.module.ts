import { AppController } from './app.controller';
import { RouterModule } from '@nestjs/core';
import { routes } from './routes';
import { Module } from '@nestjs/common';

@Module({
  imports: [RouterModule.register(routes)],
  controllers: [AppController],
})
export class RestModule {}
