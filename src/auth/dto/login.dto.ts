import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class LoginDto {
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
  password: string;

  @ApiProperty({
    description: 'Device name you are logging in with',
    example: 'Galaxy Note 9',
    required: false,
  })
  @IsString()
  @Length(1, 64)
  deviceName?: string;
}
