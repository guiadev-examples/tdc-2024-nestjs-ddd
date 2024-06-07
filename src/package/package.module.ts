import { Module } from '@nestjs/common';
import { PackageService } from './package.service';
import { PackageController } from './package.controller';

@Module({
  controllers: [PackageController],
  providers: [PackageService],
})
export class PackageModule {}
