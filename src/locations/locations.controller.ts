import {
  Controller,
  Get,
  Post,
  Request,
  Body,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { LocationsService } from './locations.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { JwtAccessAuthGuard } from '../auth/guards/jwt-access-auth.guard';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { ListLocationQueryDto } from './dto/list-location-query.dto';
import { LocationParamDto } from './dto/location-param.dto';

@Controller('locations')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @ApiOperation({
    summary: 'Create new location post',
  })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAccessAuthGuard)
  @Post()
  create(@Request() req, @Body() createLocationDto: CreateLocationDto) {
    return this.locationsService.create(req.user, createLocationDto);
  }

  @ApiOperation({
    summary: 'Get paginated location posts',
  })
  @Get()
  getLocations(@Query() query: ListLocationQueryDto) {
    return this.locationsService.getLocations(query.page, query.size);
  }

  @ApiOperation({
    summary: 'Get location post',
  })
  @Get(':id')
  findOne(@Param() param: LocationParamDto) {
    return this.locationsService.findOne(param.id);
  }

  // Users should delete the location and post a new one
  /*@Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateLocationDto: UpdateLocationDto,
  ) {
    return this.locationsService.update(+id, updateLocationDto);
  }*/

  @ApiOperation({
    summary: 'Delete location post',
  })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAccessAuthGuard)
  @Delete(':id')
  remove(@Request() req, @Param() param: LocationParamDto) {
    return this.locationsService.remove(req.user, param.id);
  }
}
