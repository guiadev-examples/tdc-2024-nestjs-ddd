import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigurationModule } from './configuration/configuration.module';
import { EventModule } from './event/event.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ConfigurationModule, DatabaseModule, EventModule, AuthModule],
})
export class InfraModule {}
