import {
  Controller,
  Get,
  Post,
  Put,
  Param,
  Body,
  UseGuards,
  Request,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { FlashcardService } from '../services/flashcard.service';
import { CreateFlashcardDto } from '../dto/create-flashcard.dto';
import { UpdateFlashcardDto } from '../dto/update-flashcard.dto';
import { FlashcardEntity } from '../entities/flashcard.entity';

@Controller('api/flashcards')
@UseGuards(JwtAuthGuard)
@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
export class FlashcardController {
  constructor(private readonly flashcardService: FlashcardService) {}

  @Post()
  async createFlashcard(
    @Body() createFlashcardDto: CreateFlashcardDto,
    @Request() req: any,
  ): Promise<FlashcardEntity> {
    const userId = req.user.id;
    return this.flashcardService.createFlashcard(createFlashcardDto, userId);
  }

  @Get()
  async getUserFlashcards(@Request() req: any): Promise<FlashcardEntity[]> {
    const userId = req.user.id;
    return this.flashcardService.getUserFlashcards(userId);
  }

  @Put(':id')
  async updateFlashcard(
    @Param('id') id: string,
    @Body() updateFlashcardDto: UpdateFlashcardDto,
    @Request() req: any,
  ): Promise<FlashcardEntity> {
    const userId = req.user.id;
    return this.flashcardService.updateFlashcard(id, updateFlashcardDto, userId);
  }
}