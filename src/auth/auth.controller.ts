import {
  Controller,
  Post,
  UseGuards,
  Request,
  Body,
  HttpCode,
  UseInterceptors,
  ClassSerializerInterceptor,
  Get,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/Register.dto';
import { JwtAccessAuthGuard } from './guards/jwt-access-auth.guard';
import { JwtRefreshAuthGuard } from './guards/jwt-refresh-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({
    summary: 'Register new account',
  })
  @ApiCreatedResponse({ description: 'Account created' })
  @ApiBadRequestResponse({
    description: 'Bad Request',
  })
  @ApiConflictResponse({
    description: 'User already exists',
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @ApiOperation({
    summary: 'Login to receive access and refresh tokens',
  })
  @ApiOkResponse({ description: 'Retreived access and refresh tokens' })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  @UseGuards(LocalAuthGuard)
  @HttpCode(200)
  @Post('login')
  login(@Request() req, @Body() dto: LoginDto) {
    return this.authService.login(req.user, dto);
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: 'Logout and invalidate access and refresh tokens',
  })
  @ApiOkResponse({ description: 'Logged out' })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  @UseGuards(JwtRefreshAuthGuard)
  @HttpCode(200)
  @Get('logout')
  logout(@Request() req) {
    return this.authService.logout(req.user);
  }

  @ApiBearerAuth('refresh-token')
  @ApiOperation({
    summary: 'Retreive access tokens from your refresh token',
  })
  @ApiOkResponse({ description: 'Retreived access token' })
  @ApiUnauthorizedResponse({ description: 'Invalid refresh token' })
  @UseGuards(JwtRefreshAuthGuard)
  @HttpCode(200)
  @Get('refresh')
  refresh(@Request() req) {
    return this.authService.refresh(req.user);
  }
}
