import {
  Controller,
  Get,
  Post,
  Request,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GuessesService } from './guesses.service';
import { CreateGuessDto } from './dto/create-guess.dto';
import { UpdateGuessDto } from './dto/update-guess.dto';
import { LocationDto } from '../locations/dto/create-location.dto';

@Controller('location/guess')
export class GuessesController {
  constructor(private readonly guessesService: GuessesService) {}

  @Post(':id')
  create(
    @Request() req,
    @Param('id') id: number,
    @Body() locationDto: LocationDto,
  ) {
    return this.guessesService.create(req.user, id, locationDto);
  }

  @Get()
  findAll() {
    return this.guessesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.guessesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGuessDto: UpdateGuessDto) {
    return this.guessesService.update(+id, updateGuessDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.guessesService.remove(+id);
  }
}
