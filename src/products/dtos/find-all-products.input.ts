import * as Transformer from 'class-transformer';
import * as Validator from 'class-validator';
import { FindAllProductsInput } from '../interfaces/find-all-products-input.interface';

export class FindAllProductsDto implements FindAllProductsInput {
  @Validator.IsOptional()
  @Validator.Min(0)
  @Transformer.Transform(({ value }) => Number(value))
  skip?: number = 0;

  @Validator.IsOptional()
  @Validator.Min(1)
  @Transformer.Transform(({ value }) => Number(value))
  take?: number = 20;

  @Validator.IsOptional()
  @Validator.IsUUID('4')
  @Validator.IsNotEmpty()
  category_id?: string;

  @Validator.IsOptional()
  @Validator.Max(300)
  @Validator.IsNotEmpty()
  name?: string;

  @Validator.IsOptional()
  @Validator.IsPositive()
  @Transformer.Transform(({ value }) => Number(value))
  min_price?: number;

  @Validator.IsOptional()
  @Validator.IsPositive()
  @Transformer.Transform(({ value }) => Number(value))
  max_price?: number;
}
