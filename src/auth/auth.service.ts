import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as argon2 from 'argon2';
//import * as crypto from 'crypto';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/Register.dto';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository } from 'typeorm';
import { LoginDto } from './dto/login.dto';
import { Token } from '../entities/token.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Token) private tokenRepository: Repository<Token>,
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    if (user) {
      try {
        if (await argon2.verify(user.password, password)) {
          //const { password, ...result } = user;
          //return result;
          return user;
        }
      } catch (err) {}
      return null;
    }
  }

  async login(user: User, dto: LoginDto) {
    await getConnection()
      .createQueryBuilder()
      .delete()
      .from(Token)
      .where(
        "createdAt < (now() - interval '" +
          this.configService.get<string>('jwt.refresh.expiresIn') +
          "')",
      )
      .execute()
      .catch(() => {});

    const tokenUUID = await this.tokenRepository
      .save({
        user,
        deviceName: dto.deviceName,
      })
      .catch(() => {
        throw new InternalServerErrorException();
      });

    const refresh_token = await this.getRefreshToken(user.id, tokenUUID.id);

    const access_token = await this.getAccessToken(user.id, tokenUUID.id);

    return {
      refresh_token,
      access_token,
    };
  }

  async logout(token: Token) {
    const info = { sub: token.user.id, uuid: token.id };
    try {
      await this.tokenRepository.remove(token);
    } catch (err) {
      throw new InternalServerErrorException();
    }
    return info;
  }

  async register(dto: RegisterDto) {
    dto.password = await argon2.hash(dto.password);
    try {
      const { password, ...result } = await this.userRepository.save(dto);
      return result;
    } catch (err) {
      if (err.driverError.routine === '_bt_check_unique')
        throw new ConflictException();
    }
    throw new InternalServerErrorException();
  }

  async refresh(token: Token) {
    const access_token = await this.getAccessToken(token.user.id, token.id);
    return { access_token };
  }

  getAccessToken(sub: number, uuid: string): Promise<string> {
    const token = this.jwtService.signAsync(
      { sub, uuid },
      {
        secret: this.configService.get<string>('jwt.access.secret'),
        expiresIn: this.configService.get<number>('jwt.access.expiresIn'),
      },
    );
    return token;
  }

  getRefreshToken(sub: number, uuid: string): Promise<string> {
    const token = this.jwtService.signAsync(
      { sub, uuid },
      {
        secret: this.configService.get<string>('jwt.refresh.secret'),
        expiresIn: this.configService.get<number>('jwt.refresh.expiresIn'),
      },
    );
    return token;
  }
}
