import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { BadRequestException, ForbiddenException, NotFoundException } from '@nestjs/common';
import { FlashcardService } from '../../../main/services/flashcard.service';
import { Flashcard } from '../../../main/models/flashcard.schema';
import { CreateFlashcardDto } from '../../../main/dto/create-flashcard.dto';
import { UpdateFlashcardDto } from '../../../main/dto/update-flashcard.dto';

describe('FlashcardService', () => {
  let service: FlashcardService;

  const mockFlashcard = {
    _id: 'mockId',
    frontContent: 'Hello',
    backContent: 'Hola',
    userId: 'user123',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  // This mock is a function that can be instantiated with `new`
  // and also has static methods attached.
  const mockFlashcardModel = Object.assign(
    jest.fn().mockImplementation(() => ({
      save: jest.fn().mockResolvedValue(mockFlashcard),
    })),
    {
      find: jest.fn().mockReturnValue({
        sort: jest.fn().mockReturnValue({
          exec: jest.fn().mockResolvedValue([mockFlashcard]),
        }),
      }),
      findById: jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockFlashcard),
      }),
      findByIdAndUpdate: jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockFlashcard),
      }),
    },
  );

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FlashcardService,
        {
          provide: getModelToken(Flashcard.name),
          useValue: mockFlashcardModel,
        },
      ],
    }).compile();

    service = module.get<FlashcardService>(FlashcardService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createFlashcard', () => {
    it('should create a flashcard successfully', async () => {
      const createDto: CreateFlashcardDto = { frontContent: 'Hello', backContent: 'Hola' };
      const userId = 'user123';
      const result = await service.createFlashcard(createDto, userId);

      expect(mockFlashcardModel).toHaveBeenCalledWith({ ...createDto, userId });
      expect(result.frontContent).toBe(createDto.frontContent);
    });

    it('should throw BadRequestException for empty front content', async () => {
      const createDto: CreateFlashcardDto = { frontContent: ' ', backContent: 'Hola' };
      await expect(service.createFlashcard(createDto, 'user123')).rejects.toThrow(BadRequestException);
    });

    it('should throw BadRequestException for empty back content', async () => {
      const createDto: CreateFlashcardDto = { frontContent: 'Hello', backContent: ' ' };
      await expect(service.createFlashcard(createDto, 'user123')).rejects.toThrow(BadRequestException);
    });
  });

  describe('getUserFlashcards', () => {
    it('should return user flashcards', async () => {
      const userId = 'user123';
      const result = await service.getUserFlashcards(userId);
      expect(mockFlashcardModel.find).toHaveBeenCalledWith({ userId });
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe(mockFlashcard._id);
    });
  });

  describe('updateFlashcard', () => {
    it('should update a flashcard successfully', async () => {
      const id = 'flashcardId';
      const updateDto: UpdateFlashcardDto = { frontContent: 'Updated Hello' };
      const userId = 'user123';

      const updatedFlashcard = { ...mockFlashcard, frontContent: updateDto.frontContent };
      (mockFlashcardModel.findByIdAndUpdate as jest.Mock).mockReturnValue({
        exec: jest.fn().mockResolvedValue(updatedFlashcard),
      });

      const result = await service.updateFlashcard(id, updateDto, userId);
      expect(mockFlashcardModel.findById).toHaveBeenCalledWith(id);
      expect(result.frontContent).toBe(updateDto.frontContent);
    });

    it('should throw NotFoundException if flashcard not found', async () => {
      (mockFlashcardModel.findById as jest.Mock).mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      });
      const updateDto: UpdateFlashcardDto = { frontContent: 'Updated' };
      await expect(service.updateFlashcard('id', updateDto, 'user123')).rejects.toThrow(NotFoundException);
    });

    it('should throw ForbiddenException if user is not owner', async () => {
      const otherUserFlashcard = { ...mockFlashcard, userId: 'otherUser' };
      (mockFlashcardModel.findById as jest.Mock).mockReturnValue({
        exec: jest.fn().mockResolvedValue(otherUserFlashcard),
      });
      const updateDto: UpdateFlashcardDto = { frontContent: 'Updated' };
      await expect(service.updateFlashcard('id', updateDto, 'user123')).rejects.toThrow(ForbiddenException);
    });
  });
});