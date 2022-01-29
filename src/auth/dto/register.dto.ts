import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    description: 'Your email address for the account',
    example: 'user@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Your password for the account',
    example: 'iPuOsGR3NoFHPLckM6Y8',
  })
  @IsNotEmpty()
  @IsString()
  @Length(1, 128)
  password: string;

  @ApiProperty({
    description: 'Your first name',
    example: 'John',
  })
  @IsNotEmpty()
  @IsString()
  @Length(1, 64)
  firstName: string;

  @ApiProperty({
    description: 'Your last name',
    example: 'Doe',
  })
  @IsNotEmpty()
  @IsString()
  @Length(1, 64)
  lastName: string;
}
