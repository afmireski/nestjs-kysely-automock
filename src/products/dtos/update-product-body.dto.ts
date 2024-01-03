import * as Transformer from 'class-transformer';
import * as Validator from 'class-validator';
import { UpdateProductBodyData } from '../interfaces/update-product-input.interface';

export class UpdateProductBody implements UpdateProductBodyData {
  @Validator.IsUUID('4')
  @Validator.IsNotEmpty()
  @Validator.IsOptional()
  category_id?: string;

  @Validator.MaxLength(300)
  @Validator.IsNotEmpty()
  @Validator.IsOptional()
  name?: string;

  @Validator.IsNotEmpty()
  @Validator.IsOptional()
  description?: string;

  @Validator.IsOptional()
  @Validator.IsNotEmptyObject()
  @Validator.IsOptional()
  details?: Record<string, unknown> | null;

  @Validator.IsOptional()
  @Validator.IsPositive()
  @Transformer.Transform(({ value }) => Number(value))
  @Validator.IsOptional()
  price?: number;
}
