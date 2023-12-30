import { ProductModel } from '../models/product.model';
import { CreateProductInput } from './create-product-input.interface';

export interface UpdateProductData
  extends Partial<
    Omit<ProductModel, 'id' | 'created_at' | 'updated_at' | 'deleted_at'>
  > {
  price?: number;
}

export interface UpdateProductInput extends Pick<ProductModel, 'id'> {
  data: Partial<CreateProductInput>;
}
