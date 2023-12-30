import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { KyselyProductsRepositoryAdapter } from './adapters/kysely-products-repository.adapter';
import { PRODUCTS_REPOSITORY } from './ports/products-repository.port';

@Module({
  controllers: [ProductsController],
  providers: [
    ProductsService,
    KyselyProductsRepositoryAdapter,
    {
      provide: PRODUCTS_REPOSITORY,
      useExisting: KyselyProductsRepositoryAdapter,
    },
  ],
})
export class ProductsModule {}
