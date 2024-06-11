import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientAuthGuard } from './guards/client-auth.guard';
import { UserAuthGuard } from './guards/user-auth.guard';
import { ApiKeyStrategy } from './providers/api-key.strategy';

@Module({
  imports: [ConfigModule],
  providers: [ApiKeyStrategy, ClientAuthGuard, UserAuthGuard],
})
export class AuthModule {}
