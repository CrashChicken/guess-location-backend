import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TokenDto } from '../dto/token.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Token } from '../../entities/token.entity';
import { Repository } from 'typeorm';

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(
  Strategy,
  'jwt-access',
) {
  constructor(
    @InjectRepository(Token) private tokenRepository: Repository<Token>,
    private configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('jwt.access.secret'),
    });
  }

  async validate(payload: TokenDto): Promise<Token> {
    if (payload.uuid) {
      try {
        return await this.tokenRepository.findOneOrFail(payload.uuid, {
          relations: ['user'],
        });
      } catch (err) {
        throw new UnauthorizedException();
      }
    }
    //return { sub: payload.sub, uuid: payload.uuid };
  }
}
