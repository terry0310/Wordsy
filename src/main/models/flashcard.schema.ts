import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FlashcardDocument = Flashcard & Document;

@Schema({
  timestamps: true, // Automatically adds createdAt and updatedAt
})
export class Flashcard {
  @Prop({ required: true, trim: true })
  frontContent: string;

  @Prop({ required: true, trim: true })
  backContent: string;

  @Prop({ required: true })
  userId: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const FlashcardSchema = SchemaFactory.createForClass(Flashcard);

// Add indexes for better query performance
FlashcardSchema.index({ userId: 1 });
FlashcardSchema.index({ createdAt: -1 });