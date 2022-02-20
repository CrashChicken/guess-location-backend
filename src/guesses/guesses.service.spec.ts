import { Test, TestingModule } from '@nestjs/testing';
import { GuessesService } from './guesses.service';

describe('GuessesService', () => {
  let service: GuessesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GuessesService],
    }).compile();

    service = module.get<GuessesService>(GuessesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
