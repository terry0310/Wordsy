import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FlashcardController } from '../controllers/flashcard.controller';
import { FlashcardService } from '../services/flashcard.service';
import { Flashcard, FlashcardSchema } from '../models/flashcard.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Flashcard.name, schema: FlashcardSchema },
    ]),
  ],
  controllers: [FlashcardController],
  providers: [FlashcardService],
  exports: [FlashcardService],
})
export class FlashcardModule {}