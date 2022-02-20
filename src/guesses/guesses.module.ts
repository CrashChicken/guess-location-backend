import { Module } from '@nestjs/common';
import { GuessesService } from './guesses.service';
import { GuessesController } from './guesses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Location } from '../entities/location.entity';
import { Guess } from '../entities/guess.entity';

@Module({
  controllers: [GuessesController],
  providers: [GuessesService],
  imports: [TypeOrmModule.forFeature([Location, Guess])],
})
export class GuessesModule {}
