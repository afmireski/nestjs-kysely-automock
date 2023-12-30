import { Inject, Injectable } from '@nestjs/common';
import { ProductEntity } from './entities/product.entity';
import {
  PRODUCTS_REPOSITORY,
  ProductsRepository,
} from './ports/products-repository.port';
import { InternalException } from 'src/exception-handling/internal.exception';

@Injectable()
export class ProductsService {
  constructor(
    @Inject(PRODUCTS_REPOSITORY)
    private readonly repository: ProductsRepository,
  ) {}

  async findById(id: string): Promise<ProductEntity> {
    return Promise.resolve(this.repository.findById(id)).then(
      (repositoryData) => {
        if (!repositoryData) throw new InternalException(201);

        const categoryRegExp = /category_(?<field>\w+)/;
        const fieldsToRemove = /updated_at/;
        const response: any = { category: {} };

        // Monta o retorno
        Object.keys(repositoryData).forEach((key) => {
          if (!fieldsToRemove.test(key)) {
            if (categoryRegExp.test(key)) {
              // Obtém o nome do campo
              const {
                groups: { field },
              } = categoryRegExp.exec(key);
              Object.assign(response.category, {
                [field]: repositoryData[key],
              });
            } else {
              Object.assign(response, { [key]: repositoryData[key] });
            }
          }
        });

        return response;
      },
    );
  }
}
