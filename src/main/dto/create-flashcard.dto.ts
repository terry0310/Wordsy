import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateFlashcardDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(1000)
  frontContent: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(1000)
  backContent: string;
}