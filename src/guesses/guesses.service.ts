import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from '../entities/location.entity';
import { Guess } from '../entities/guess.entity';
import { LocationDto } from '../locations/dto/create-location.dto';
import { UpdateGuessDto } from './dto/update-guess.dto';
import { Point } from 'geojson';
import { User } from '../entities/user.entity';

@Injectable()
export class GuessesService {
  constructor(
    @InjectRepository(Location)
    private locationRepository: Repository<Location>,
    @InjectRepository(Guess)
    private guessRepository: Repository<Guess>,
  ) {}

  async create(user: User, id: number, locationDto: LocationDto) {
    const location = await this.locationRepository.findOneOrFail(id);

    const guessedLocation: Point = {
      type: 'Point',
      coordinates: [locationDto.longitude, locationDto.latitude],
    };

    return this.guessRepository.save({ location, guessedLocation, user });
  }

  findAll() {
    return `This action returns all guesses`;
  }

  async findOne(id: number) {
    const guess = await this.guessRepository
      .createQueryBuilder('guess')
      .select([
        'ST_Distance(location.location, guess.guessedLocation), guess.*, location.*',
      ])
      .leftJoin('guess.location', 'location')
      .getRawMany();
    return guess;
  }

  update(id: number, updateGuessDto: UpdateGuessDto) {
    return `This action updates a #${id} guess`;
  }

  remove(id: number) {
    return `This action removes a #${id} guess`;
  }
}
