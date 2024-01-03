import { CategoryEntity, ProductCategory } from '../entities/category.entity';

export class CategoryDto implements CategoryEntity {
  id: string;
  name: string;
  description: string;
  created_at: Date;
  deleted_at: Date;
}

export class ProductCategoryDto implements ProductCategory {
  id: string;
  name: string;
  description: string;
}
