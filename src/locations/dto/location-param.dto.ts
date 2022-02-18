import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  Max,
  Min,
} from 'class-validator';

export class LocationParamDto {
  @ApiProperty({
    description: 'Location id',
    example: 0,
    minimum: 0,
  })
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Type(() => Number)
  id: number = 0;
}
