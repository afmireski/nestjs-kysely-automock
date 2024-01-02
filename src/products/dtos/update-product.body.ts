import * as Transformer from 'class-transformer';
import * as Validator from 'class-validator';
import { UpdateProductBodyData } from '../interfaces/update-product-input.interface';

export class UpdateProductBody implements UpdateProductBodyData {
  @Validator.IsUUID('4')
  @Validator.IsNotEmpty()
  category_id?: string;

  @Validator.MaxLength(300)
  @Validator.IsNotEmpty()
  name?: string;

  @Validator.IsNotEmpty()
  description?: string;

  @Validator.IsOptional()
  @Validator.IsNotEmptyObject()
  details?: Record<string, unknown> | null;

  @Validator.IsOptional()
  @Validator.IsPositive()
  @Transformer.Transform(({ value }) => Number(value))
  price?: number;
}
