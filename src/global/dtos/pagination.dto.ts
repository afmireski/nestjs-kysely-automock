import { Pagination } from '../interfaces/pagination';
import * as Validator from 'class-validator';

export class PaginationDto implements Pagination {
  @Validator.IsOptional()
  @Validator.Min(0)
  skip?: number = 0;

  @Validator.IsOptional()
  @Validator.Min(1)
  take?: number = 20;
}
