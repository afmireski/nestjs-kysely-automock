import { CategoryModel } from '../models/category.model';

export type CategoryEntity = Omit<CategoryModel, 'updated_at'>;

export type ProductCategory = Pick<CategoryEntity, 'name' | 'description'>;
