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

export class ListLocationQueryDto {
  @ApiProperty({
    description: 'Page number (starts with 0) (default: 0)',
    example: 0,
    minimum: 0,
    required: false,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Type(() => Number)
  page: number = 0;

  @ApiProperty({
    description: 'Number of returned elements per page (max: 50) (default: 9)',
    example: 10,
    minimum: 1,
    maximum: 50,
    required: false,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  @Max(50)
  @Type(() => Number)
  size: number = 9;
}
