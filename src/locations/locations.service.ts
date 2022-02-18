import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { Location } from '../entities/location.entity';
import { Geometry } from 'geojson';
import { ConfigService } from '@nestjs/config';
import { Token } from '../entities/token.entity';
import { S3Service } from '../s3/s3.service';

@Injectable()
export class LocationsService {
  constructor(
    private configService: ConfigService,
    private s3Service: S3Service,
    @InjectRepository(Location)
    private locationRepository: Repository<Location>,
  ) {}

  async create(token: Token, createLocationDto: CreateLocationDto) {
    const imageExtensions = ['png', 'jpg'];

    if (!imageExtensions.includes(createLocationDto.imageExtension))
      throw new BadRequestException();

    const point: Geometry = {
      type: 'Point',
      coordinates: [
        createLocationDto.location.longitude,
        createLocationDto.location.latitude,
      ],
    };

    const location = await this.locationRepository.save({
      location: point,
      user: token.user,
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

  getLocations(page: number, size: number) {
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

  update(id: number, updateLocationDto: UpdateLocationDto) {
    return `This action updates a #${id} location`;
  }

  async remove(token: Token, id: number) {
    try {
      const location = await this.locationRepository.findOneOrFail(id, {
        relations: ['user'],
      });

      if (location.user.id === token.user.id) {
        await this.s3Service.deleteFile(id + '/original.png');
        return this.locationRepository.remove(location);
      }
      throw new ForbiddenException();
    } catch (err) {
      throw new NotFoundException();
    }
  }
}
