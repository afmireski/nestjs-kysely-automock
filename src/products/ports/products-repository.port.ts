import { CreateProductInput } from '../interfaces/create-product-input.interface';
import { FindAllProductsInput } from '../interfaces/find-all-products-input.interface';
import { UpdateProductInput } from '../interfaces/update-product-input.interface';
import { ProductModel } from '../models/product.model';

export const PRODUCTS_REPOSITORY_PORT = 'PRODUCTS_REPOSITORY_PORT';

export interface ProductsRepository {
  findById(id: string): Promise<ProductModel>;

  findAll(input: FindAllProductsInput): Promise<Array<ProductModel>>;

  create(input: CreateProductInput): Promise<ProductModel>;

  update(input: UpdateProductInput): Promise<ProductModel>;
}
