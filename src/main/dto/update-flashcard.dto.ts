import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateFlashcardDto {
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  frontContent?: string;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  backContent?: string;
}