import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Flashcard, FlashcardDocument } from '../models/flashcard.schema';
import { CreateFlashcardDto } from '../dto/create-flashcard.dto';
import { UpdateFlashcardDto } from '../dto/update-flashcard.dto';
import { FlashcardEntity } from '../entities/flashcard.entity';

@Injectable()
export class FlashcardService {
  constructor(
    @InjectModel(Flashcard.name)
    private flashcardModel: Model<FlashcardDocument>,
  ) {}

  async createFlashcard(
    createFlashcardDto: CreateFlashcardDto,
    userId: string,
  ): Promise<FlashcardEntity> {
    // Validate content is not empty
    this.validateFlashcardContent(createFlashcardDto);

    const flashcard = new this.flashcardModel({
      ...createFlashcardDto,
      userId,
    });

    const savedFlashcard = await flashcard.save();
    return this.toEntity(savedFlashcard);
  }

  async getUserFlashcards(userId: string): Promise<FlashcardEntity[]> {
    const flashcards = await this.flashcardModel
      .find({ userId })
      .sort({ createdAt: -1 })
      .exec();

    return flashcards.map(flashcard => this.toEntity(flashcard));
  }

  async updateFlashcard(
    id: string,
    updateFlashcardDto: UpdateFlashcardDto,
    userId: string,
  ): Promise<FlashcardEntity> {
    // Validate content if provided
    if (updateFlashcardDto.frontContent || updateFlashcardDto.backContent) {
      this.validateFlashcardContent(updateFlashcardDto);
    }

    const flashcard = await this.flashcardModel.findById(id).exec();

    if (!flashcard) {
      throw new NotFoundException('Flashcard not found');
    }

    // Ensure user can only update their own flashcards
    if (flashcard.userId !== userId) {
      throw new ForbiddenException('You can only update your own flashcards');
    }

    const updatedFlashcard = await this.flashcardModel
      .findByIdAndUpdate(
        id,
        { ...updateFlashcardDto, updatedAt: new Date() },
        { new: true }
      )
      .exec();

    return this.toEntity(updatedFlashcard);
  }

  private validateFlashcardContent(content: Partial<CreateFlashcardDto>): void {
    if (content.frontContent !== undefined && !content.frontContent.trim()) {
      throw new BadRequestException('Front content cannot be empty');
    }
    if (content.backContent !== undefined && !content.backContent.trim()) {
      throw new BadRequestException('Back content cannot be empty');
    }
  }

  private toEntity(flashcard: FlashcardDocument): FlashcardEntity {
    return new FlashcardEntity({
      id: flashcard._id.toString(),
      frontContent: flashcard.frontContent,
      backContent: flashcard.backContent,
      userId: flashcard.userId,
      createdAt: flashcard.createdAt,
      updatedAt: flashcard.updatedAt,
    });
  }
}