import { Pagination } from 'src/global/interfaces/pagination';
import { CreateCategoryInput } from '../interfaces/create-category-input.interface';
import { CategoryModel } from '../models/category.model';

export const CATEGORIES_REPOSITORY_PORT = 'CATEGORIES_REPOSITORY_PORT';

export interface CategoriesRepository {
  findById(id: string): Promise<CategoryModel>;

  findAll(input?: Pagination): Promise<Array<CategoryModel>>;

  create(input: CreateCategoryInput): Promise<CategoryModel>;
}
