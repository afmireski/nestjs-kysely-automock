import { ProductModel } from '../models/product.model';

export interface CreateProductInput
  extends Omit<
    ProductModel,
    'id' | 'created_at' | 'updated_at' | 'deleted_at'
  > {
  id?: string;
  price?: number;
}
