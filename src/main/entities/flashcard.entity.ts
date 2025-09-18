export class FlashcardEntity {
  id: string;
  frontContent: string;
  backContent: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(partial: Partial<FlashcardEntity>) {
    Object.assign(this, partial);
  }
}