import { Inject, Injectable } from '@nestjs/common';
import { ProductEntity } from './entities/product.entity';
import {
  PRODUCTS_REPOSITORY,
  ProductsRepository,
} from './ports/products-repository.port';
import { InternalException } from 'src/exception-handling/internal.exception';
import { FindAllProductsInput } from './interfaces/find-all-products-input.interface';

@Injectable()
export class ProductsService {
  constructor(
    @Inject(PRODUCTS_REPOSITORY)
    private readonly repository: ProductsRepository,
  ) {}

  buildSingleProductEntity(data): ProductEntity {
    const categoryRegExp = /category_(?<field>\w+)/;
    const fieldsToRemove = /updated_at/;
    const response: any = { category: {} };

    // Monta o retorno
    Object.keys(data).forEach((key) => {
      if (!fieldsToRemove.test(key)) {
        if (categoryRegExp.test(key)) {
          // Obtém o nome do campo
          const {
            groups: { field },
          } = categoryRegExp.exec(key);
          Object.assign(response.category, {
            [field]: data[key],
          });
        } else {
          Object.assign(response, { [key]: data[key] });
        }
      }
    });

    return response;
  }

  async findById(id: string): Promise<ProductEntity> {
    return Promise.resolve(this.repository.findById(id)).then(
      (repositoryData) => {
        if (!repositoryData) throw new InternalException(201);

        return this.buildSingleProductEntity(repositoryData);
      },
    );
  }

  async list(input: FindAllProductsInput = {}): Promise<Array<ProductEntity>> {
    if (!input?.take) input.take = 20;
    if (!input?.skip) input.skip = 0;

    if (
      input?.max_price &&
      input?.min_price &&
      input?.max_price < input?.min_price
    )
      throw new InternalException(203);

    return Promise.resolve(this.repository.findAll(input))
      .then((repositoryData) =>
        repositoryData.reduce((response, current) => {
          const element = this.buildSingleProductEntity(current);

          response.push(element);

          return response;
        }, []),
      )
      .catch((_) => {
        throw new InternalException(202);
      });
  }
}
