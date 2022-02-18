import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsLatitude,
  IsLongitude,
  IsNotEmpty,
  ValidateNested,
} from 'class-validator';

export class LocationDto {
  @ApiProperty({
    description: 'Longitude of the coordinate',
    example: 46.5591645588724,
  })
  @IsLongitude()
  @IsNotEmpty()
  longitude: number;

  @ApiProperty({
    description: 'Latitude of the coordinate',
    example: 15.638116420250157,
  })
  @IsLatitude()
  @IsNotEmpty()
  latitude: number;
}

export class CreateLocationDto {
  @ApiProperty({ type: LocationDto })
  @Type(() => LocationDto)
  @ValidateNested()
  location: LocationDto;

  @ApiProperty({
    description: 'Extension of the image to be uploaded',
    example: 'png',
  })
  @IsNotEmpty()
  imageExtension: string;
}
