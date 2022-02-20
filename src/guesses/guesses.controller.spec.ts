import { Test, TestingModule } from '@nestjs/testing';
import { GuessesController } from './guesses.controller';
import { GuessesService } from './guesses.service';

describe('GuessesController', () => {
  let controller: GuessesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GuessesController],
      providers: [GuessesService],
    }).compile();

    controller = module.get<GuessesController>(GuessesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
