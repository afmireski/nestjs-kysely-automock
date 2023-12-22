import { Category } from 'kysely/kysely-types';
import { CategoryModel } from '../models/category.model';

export const CATEGORIES_REPOSITORY_PORT = 'CATEGORIES_REPOSITORY_PORT';

export interface CategoriesRepository {
  findById(id: string): Promise<CategoryModel>;
}
