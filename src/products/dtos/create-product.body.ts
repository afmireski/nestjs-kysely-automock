import { CreateProductInput } from '../interfaces/create-product-input.interface';
import * as Validator from 'class-validator';
import * as Transformer from 'class-transformer';

export class CreateProductBody implements Omit<CreateProductInput, 'id'> {
  @Validator.IsUUID('4')
  @Validator.IsNotEmpty()
  category_id: string;

  @Validator.MaxLength(300)
  @Validator.IsNotEmpty()
  name: string;

  @Validator.IsNotEmpty()
  description: string;

  @Validator.IsOptional()
  @Validator.IsJSON()
  @Validator.IsNotEmptyObject()
  @Transformer.Transform(({ value }) => (value ? JSON.parse(value) : null))
  details?: Record<string, unknown> | null;

  @Validator.IsOptional()
  @Validator.IsPositive()
  @Transformer.Transform(({ value }) => Number(value))
  price?: number;
}
