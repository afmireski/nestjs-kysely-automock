import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { KyselyProductsRepositoryAdapter } from './adapters/kysely-products-repository.adapter';
import { PRODUCTS_REPOSITORY_PORT } from './ports/products-repository.port';
import { KyselyCategoriesRepositoryAdapter } from 'src/categories/adapters/kysely-categories-repository.adapter';
import { CATEGORIES_REPOSITORY_PORT } from 'src/categories/ports/categories-repository.port';

@Module({
  controllers: [ProductsController],
  providers: [
    ProductsService,
    KyselyProductsRepositoryAdapter,
    {
      provide: PRODUCTS_REPOSITORY_PORT,
      useExisting: KyselyProductsRepositoryAdapter,
    },
    KyselyCategoriesRepositoryAdapter,
    {
      provide: CATEGORIES_REPOSITORY_PORT,
      useExisting: KyselyCategoriesRepositoryAdapter,
    },
  ],
})
export class ProductsModule {}
