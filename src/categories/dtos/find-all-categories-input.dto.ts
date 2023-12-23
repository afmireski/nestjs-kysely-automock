import { PaginationDto } from 'src/global/dtos/pagination.dto';
import { FindAllCategoriesInput } from '../interfaces/find-all-categories-input.interface';
import * as Validator from 'class-validator';
import * as Transformer from 'class-transformer';

export class FindAllCategoriesDto implements FindAllCategoriesInput {
  @Validator.IsOptional()
  @Transformer.Type(() => PaginationDto)
  @Validator.ValidateNested()
  pagination: PaginationDto = {
    skip: 0,
    take: 20,
  };
}
