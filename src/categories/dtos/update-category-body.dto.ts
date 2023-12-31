import { UpdateCategoryInput } from '../interfaces/update-category-input.interface';
import * as Validator from 'class-validator';

export class UpdateCategoryBody implements Omit<UpdateCategoryInput, 'id'> {
  @Validator.Length(1, 100)
  @Validator.IsNotEmpty()
  @Validator.IsOptional()
  name?: string;

  @Validator.Length(1, 200)
  @Validator.IsNotEmpty()
  @Validator.IsOptional()
  description?: string;
}
