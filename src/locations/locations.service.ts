import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLocationDto } from './dto/create-location.dto';
import { Location } from '../entities/location.entity';
import { Point } from 'geojson';
import { ConfigService } from '@nestjs/config';
import { S3Service } from '../s3/s3.service';
import { User } from '../entities/user.entity';

@Injectable()
export class LocationsService {
  constructor(
    private configService: ConfigService,
    private s3Service: S3Service,
    @InjectRepository(Location)
    private locationRepository: Repository<Location>,
  ) {}

  async create(user: User, createLocationDto: CreateLocationDto) {
    const imageExtensions = ['png', 'jpg'];

    if (!imageExtensions.includes(createLocationDto.imageExtension))
      throw new BadRequestException();

    const point: Point = {
      type: 'Point',
      coordinates: [
        createLocationDto.location.longitude,
        createLocationDto.location.latitude,
      ],
    };

    const location = await this.locationRepository.save({
      location: point,
      user,
    });

    const postUrl = await this.s3Service.uploadFile(
      location.id.toString(),
      createLocationDto.imageExtension,
    );

    location.image = postUrl.fields.key;
    await this.locationRepository.save(location);

    delete location.user;

    return { location, postUrl };
  }

  findAll(page: number, size: number) {
    let skip = page * size;
    let take = skip + size;

    return this.locationRepository.find({
      order: { createdAt: 'ASC' },
      skip,
      take,
    });
  }

  async findOne(id: number) {
    try {
      const location = await this.locationRepository.findOneOrFail(id);
      delete location.location;
      return location;
    } catch (err) {
      throw new NotFoundException();
    }
  }

  async remove(user: User, id: number) {
    try {
      const location = await this.locationRepository.findOneOrFail(id, {
        relations: ['user'],
      });

      if (location.user.id === user.id) {
        await this.s3Service.deleteFile(id + '/original.png');
        return this.locationRepository.remove(location);
      }
      throw new ForbiddenException();
    } catch (err) {
      throw new NotFoundException();
    }
  }
}
