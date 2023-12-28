import * as Transformer from 'class-transformer';
import * as Validator from 'class-validator';
import { Pagination } from '../interfaces/pagination';

export class PaginationDto implements Pagination {
  @Validator.IsOptional()
  @Validator.Min(0)
  @Transformer.Transform(({ value }) => Number(value))
  skip?: number = 0;

  @Validator.IsOptional()
  @Validator.Min(1)
  @Transformer.Transform(({ value }) => Number(value))
  take?: number = 20;
}
