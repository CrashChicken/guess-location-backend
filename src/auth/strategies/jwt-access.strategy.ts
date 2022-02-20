import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TokenDto } from '../dto/token.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(
  Strategy,
  'jwt-access',
) {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('jwt.access.secret'),
    });
  }

  async validate(payload: TokenDto): Promise<User> {
    if (payload.sub) {
      try {
        return await this.userRepository.findOneOrFail(payload.sub);
      } catch (err) {
        throw new UnauthorizedException();
      }
    }
    //return { sub: payload.sub, uuid: payload.uuid };
  }
}
