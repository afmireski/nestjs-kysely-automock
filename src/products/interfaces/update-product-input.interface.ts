import { ProductModel } from '../models/product.model';

export interface UpdateProductData
  extends Partial<Omit<ProductModel, 'id' | 'created_at'>> {
  price?: number;
}

export type UpdateProductBodyData = Omit<
  UpdateProductData,
  'updated_at' | 'deleted_at'
>;

export interface UpdateProductInput extends Pick<ProductModel, 'id'> {
  data: UpdateProductData;
}

export interface UpdateProductServiceInput extends UpdateProductInput {
  data: Omit<UpdateProductData, 'updated_at' | 'deleted_at'>;
}
