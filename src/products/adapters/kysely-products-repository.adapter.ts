import { Injectable } from '@nestjs/common';
import { KyselyService } from '../../kysely/kysely.service';
import { ProductsRepository } from '../ports/products-repository.port';
import { CreateProductInput } from '../interfaces/create-product-input.interface';
import { FindAllProductsInput } from '../interfaces/find-all-products-input.interface';
import { UpdateProductInput } from '../interfaces/update-product-input.interface';
import { ProductModel } from '../models/product.model';
import { ExpressionBuilder } from 'kysely';
import { DB } from 'kysely/kysely-types';

@Injectable()
export class KyselyProductsRepositoryAdapter implements ProductsRepository {
  constructor(private readonly kyselyService: KyselyService) {}

  async findById(id: string): Promise<ProductModel> {
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
        .selectAll('p')
        .select([
          'c.name as category_name',
          'c.description as category_description',
          'price',
        ])
        .where((eb) =>
          eb.and([eb('p.id', '=', id), eb('p.deleted_at', 'is', null)]),
        )
        .executeTakeFirst(),
    );
  }

  buildFindAllWhere(eb, fields) {
    const where = [
      eb('p.deleted_at', 'is', null),
      eb('c.deleted_at', 'is', null),
    ];

    const priceRegEx = /(?<field>^\w+)_price/;
    Object.keys(fields).reduce((response, key) => {
      if (priceRegEx.test(key)) {
        const {
          groups: { field },
        } = priceRegEx.exec(key);

        if (field === 'max') response.push(eb('price', '<=', fields[key]));
        else response.push(eb('price', '>=', fields[key]));
      } else {
        eb(`p.${key}`, '=', fields[key]);
      }

      return response;
    }, []);

    return eb.and(where);
  }

  async findAll(input: FindAllProductsInput): Promise<ProductModel[]> {
    const { skip, take, ...whereFields } = input;

    const priceRegEx = /(?<field>^\w+)_price/;
    const likeFieldsRegEx = /name/;
    return Promise.resolve(
      this.kyselyService.database
        .selectFrom('products as p')
        .innerJoinLateral(
          (eb) =>
            eb
              .selectFrom('product_prices as pp')
              .select(['pp.product_id', 'pp.value as price'])
              .whereRef('pp.product_id', '=', 'p.id')
              .orderBy('pp.created_at desc')
              .limit(1)
              .as('price'),
          (join) => join.onRef('price.product_id', '=', 'p.id'),
        )
        .innerJoin('categories as c', (join) =>
          join.onRef('c.id', '=', 'p.category_id'),
        )
        .selectAll('p')
        .select([
          'c.name as category_name',
          'c.description as category_description',
          'price',
        ])
        .where((eb) =>
          eb.and([
            eb('p.deleted_at', 'is', null),
            eb('c.deleted_at', 'is', null),
            ...Object.keys(whereFields).reduce((response, key) => {
              const column: any = `p.${key}`;
              if (priceRegEx.test(key)) {
                const {
                  groups: { field },
                } = priceRegEx.exec(key);

                if (field === 'max')
                  response.push(eb('price', '<=', whereFields[key]));
                else response.push(eb('price', '>=', whereFields[key]));
              } else if (likeFieldsRegEx.test(key)) {
                response.push(eb(column, 'like', `%${whereFields[key]}%`));
              } else {
                response.push(eb(column, '=', whereFields[key]));
              }

              return response;
            }, []),
          ]),
        )
        .limit(take)
        .offset(skip)
        .execute(),
    );
  }

  create(input: CreateProductInput): Promise<ProductModel> {
    throw new Error('Method not implemented.');
  }

  update(input: UpdateProductInput): Promise<ProductModel> {
    throw new Error('Method not implemented.');
  }
}
