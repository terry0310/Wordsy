import { Test, TestingModule } from '@nestjs/testing';
import { FlashcardController } from '../../../main/controllers/flashcard.controller';
import { FlashcardService } from '../../../main/services/flashcard.service';
import { JwtAuthGuard } from '../../../main/auth/jwt-auth.guard';
import { CreateFlashcardDto } from '../../../main/dto/create-flashcard.dto';
import { UpdateFlashcardDto } from '../../../main/dto/update-flashcard.dto';
import { FlashcardEntity } from '../../../main/entities/flashcard.entity';

describe('FlashcardController', () => {
  let controller: FlashcardController;
  let service: FlashcardService;

  const mockFlashcardService = {
    createFlashcard: jest.fn(),
    getUserFlashcards: jest.fn(),
    updateFlashcard: jest.fn(),
  };

  const mockJwtAuthGuard = {
    canActivate: jest.fn(() => true),
  };

  const mockRequest = {
    user: { id: 'user123' },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FlashcardController],
      providers: [
        {
          provide: FlashcardService,
          useValue: mockFlashcardService,
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue(mockJwtAuthGuard)
      .compile();

    controller = module.get<FlashcardController>(FlashcardController);
    service = module.get<FlashcardService>(FlashcardService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createFlashcard', () => {
    it('should create a flashcard', async () => {
      const createDto: CreateFlashcardDto = {
        frontContent: 'Hello',
        backContent: 'Hola',
      };

      const expectedResult = new FlashcardEntity({
        id: '1',
        frontContent: 'Hello',
        backContent: 'Hola',
        userId: 'user123',
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      mockFlashcardService.createFlashcard.mockResolvedValue(expectedResult);

      const result = await controller.createFlashcard(createDto, mockRequest);

      expect(service.createFlashcard).toHaveBeenCalledWith(createDto, 'user123');
      expect(result).toBe(expectedResult);
    });
  });

  describe('getUserFlashcards', () => {
    it('should return user flashcards', async () => {
      const expectedResult = [
        new FlashcardEntity({
          id: '1',
          frontContent: 'Hello',
          backContent: 'Hola',
          userId: 'user123',
          createdAt: new Date(),
          updatedAt: new Date(),
        }),
      ];

      mockFlashcardService.getUserFlashcards.mockResolvedValue(expectedResult);

      const result = await controller.getUserFlashcards(mockRequest);

      expect(service.getUserFlashcards).toHaveBeenCalledWith('user123');
      expect(result).toBe(expectedResult);
    });
  });

  describe('updateFlashcard', () => {
    it('should update a flashcard', async () => {
      const id = '1';
      const updateDto: UpdateFlashcardDto = {
        frontContent: 'Updated Hello',
      };

      const expectedResult = new FlashcardEntity({
        id: '1',
        frontContent: 'Updated Hello',
        backContent: 'Hola',
        userId: 'user123',
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      mockFlashcardService.updateFlashcard.mockResolvedValue(expectedResult);

      const result = await controller.updateFlashcard(id, updateDto, mockRequest);

      expect(service.updateFlashcard).toHaveBeenCalledWith(id, updateDto, 'user123');
      expect(result).toBe(expectedResult);
    });
  });
});