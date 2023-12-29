import { ProductCategory } from '../../categories/entities/category.entity';
import { ProductModel } from '../models/product.model';

export interface ProductEntity extends Omit<ProductModel, 'updated_at'> {
  price: number;
  category: ProductCategory;
}
