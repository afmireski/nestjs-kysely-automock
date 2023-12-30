import { Injectable } from '@nestjs/common';
import { KyselyService } from '../../kysely/kysely.service';
import { ProductsRepository } from '../ports/products-repository.port';
import { CreateProductInput } from '../interfaces/create-product-input.interface';
import { FindAllProductsInput } from '../interfaces/find-all-products-input.interface';
import { UpdateProductInput } from '../interfaces/update-product-input.interface';
import { ProductModel } from '../models/product.model';

@Injectable()
export class KyselyProductsRepositoryAdapter implements ProductsRepository {
  constructor(private readonly kyselyService: KyselyService) {}

  findById(id: string): Promise<ProductModel> {
    return Promise.resolve(
      this.kyselyService.database
        .selectFrom('products as p')
        .innerJoin(
          (eb) =>
            eb
              .selectFrom('product_prices as pp')
              .select(['pp.product_id', 'pp.value as price'])
              .where('pp.product_id', '=', id)
              .orderBy('pp.created_at desc')
              .limit(1)
              .as('price'),
          (join) => join.on('price.product_id', '=', id),
        )
        .innerJoin('categories as c', (join) =>
          join.onRef('c.id', '=', 'p.category_id'),
        )
        .selectAll()
        .where((eb) =>
          eb.and([eb('c.id', '=', id), eb('c.deleted_at', '<>', null)]),
        )
        .executeTakeFirst(),
    );
  }

  findAll(input: FindAllProductsInput): Promise<ProductModel[]> {
    throw new Error('Method not implemented.');
  }

  create(input: CreateProductInput): Promise<ProductModel> {
    throw new Error('Method not implemented.');
  }

  update(input: UpdateProductInput): Promise<ProductModel> {
    throw new Error('Method not implemented.');
  }
}
