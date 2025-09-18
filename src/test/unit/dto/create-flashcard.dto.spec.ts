import { validate } from 'class-validator';
import { CreateFlashcardDto } from '../../../main/dto/create-flashcard.dto';

describe('CreateFlashcardDto', () => {
  it('should pass validation with valid data', async () => {
    const dto = new CreateFlashcardDto();
    dto.frontContent = 'Hello';
    dto.backContent = 'Hola';

    const errors = await validate(dto);
    expect(errors).toHaveLength(0);
  });

  it('should fail validation with empty frontContent', async () => {
    const dto = new CreateFlashcardDto();
    dto.frontContent = '';
    dto.backContent = 'Hola';

    const errors = await validate(dto);
    expect(errors).toHaveLength(1);
    expect(errors[0].property).toBe('frontContent');
  });

  it('should fail validation with empty backContent', async () => {
    const dto = new CreateFlashcardDto();
    dto.frontContent = 'Hello';
    dto.backContent = '';

    const errors = await validate(dto);
    expect(errors).toHaveLength(1);
    expect(errors[0].property).toBe('backContent');
  });

  it('should fail validation with content too long', async () => {
    const dto = new CreateFlashcardDto();
    dto.frontContent = 'a'.repeat(1001);
    dto.backContent = 'Hola';

    const errors = await validate(dto);
    expect(errors).toHaveLength(1);
    expect(errors[0].property).toBe('frontContent');
  });

  it('should fail validation with missing frontContent', async () => {
    const dto = new CreateFlashcardDto();
    dto.backContent = 'Hola';

    const errors = await validate(dto);
    expect(errors).toHaveLength(1);
    expect(errors[0].property).toBe('frontContent');
  });

  it('should fail validation with missing backContent', async () => {
    const dto = new CreateFlashcardDto();
    dto.frontContent = 'Hello';

    const errors = await validate(dto);
    expect(errors).toHaveLength(1);
    expect(errors[0].property).toBe('backContent');
  });
});