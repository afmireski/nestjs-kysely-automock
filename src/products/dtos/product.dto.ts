import { ProductCategoryDto } from '../../categories/dtos/category.dto';
import { ProductEntity } from '../entities/product.entity';

export class ProductDto implements ProductEntity {
  price: number;
  category: ProductCategoryDto;
  id: string;
  category_id: string;
  name: string;
  description: string;
  details?: Record<string, unknown> | unknown | null;
  created_at: Date;
  deleted_at: Date;
}
