import { Module } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { LocationsController } from './locations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Location } from '../entities/location.entity';
import { ConfigModule } from '@nestjs/config';
import { S3Service } from '../s3/s3.service';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([Location])],
  controllers: [LocationsController],
  providers: [LocationsService, S3Service],
})
export class LocationsModule {}
