import { Inject, Injectable } from '@nestjs/common';
import {
  CATEGORIES_REPOSITORY_PORT,
  CategoriesRepository,
} from 'src/categories/ports/categories-repository.port';
import { InternalException } from 'src/exception-handling/internal.exception';
import { ProductEntity } from './entities/product.entity';
import { CreateProductInput } from './interfaces/create-product-input.interface';
import { FindAllProductsInput } from './interfaces/find-all-products-input.interface';
import { UpdateProductServiceInput } from './interfaces/update-product-input.interface';
import {
  PRODUCTS_REPOSITORY_PORT,
  ProductsRepository,
} from './ports/products-repository.port';

@Injectable()
export class ProductsService {
  constructor(
    @Inject(PRODUCTS_REPOSITORY_PORT)
    private readonly repository: ProductsRepository,
    @Inject(CATEGORIES_REPOSITORY_PORT)
    private readonly categoriesRepository: CategoriesRepository,
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

  async create(input: CreateProductInput): Promise<void> {
    // Verifica se a categoria do novo produto existe

    Promise.resolve(this.categoriesRepository.findById(input.category_id)).then(
      (categoryData) => {
        if (!categoryData) throw new InternalException(101);

        return this.repository.create(input).catch((_) => {
          throw new InternalException(204);
        });
      },
    );
  }

  async update(input: UpdateProductServiceInput): Promise<ProductEntity> {
    return Promise.resolve(this.repository.update(input))
      .then((repositoryData) => this.buildSingleProductEntity(repositoryData))
      .catch((_) => {
        throw new InternalException(205);
      });
  }

  async delete(id: string): Promise<void> {
    await Promise.resolve(
      this.repository.update({
        id,
        data: { deleted_at: new Date(), updated_at: new Date() },
      }),
    ).catch((_) => {
      throw new InternalException(206);
    });
  }
}
