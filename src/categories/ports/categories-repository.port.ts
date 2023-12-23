import { CreateCategoryInput } from '../interfaces/create-category-input.interface';
import { FindAllCategoriesInput } from '../interfaces/find-all-categories-input.interface';
import { CategoryModel } from '../models/category.model';

export const CATEGORIES_REPOSITORY_PORT = 'CATEGORIES_REPOSITORY_PORT';

export interface CategoriesRepository {
  findById(id: string): Promise<CategoryModel>;

  findAll(input?: FindAllCategoriesInput): Promise<Array<CategoryModel>>;

  create(input: CreateCategoryInput): Promise<CategoryModel>;
}
