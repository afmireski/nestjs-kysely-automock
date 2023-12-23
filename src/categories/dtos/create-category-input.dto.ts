import { CreateCategoryInput } from '../interfaces/create-category-input.interface';
import * as Validator from 'class-validator';

export class CreateCategoryDto implements Omit<CreateCategoryInput, 'id'> {
  @Validator.Length(1, 100)
  @Validator.IsNotEmpty()
  name: string;

  @Validator.Length(1, 200)
  @Validator.IsNotEmpty()
  description: string;
}
