import { Category } from 'kysely/kysely-types';

export const CATEGORIES_REPOSITORY_PORT = 'CATEGORIES_REPOSITORY_PORT';

export interface CategoriesRepository {
  findById(id: string): Promise<Category>;
}
