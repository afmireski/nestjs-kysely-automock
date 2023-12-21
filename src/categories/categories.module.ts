import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { KyselyCategoriesRepositoryAdapter } from './adapters/kysely-categories-repository.adapter';
import { CATEGORIES_REPOSITORY_PORT } from './ports/categories-repository.port';

@Module({
  controllers: [CategoriesController],
  providers: [
    CategoriesService,
    KyselyCategoriesRepositoryAdapter,
    {
      provide: CATEGORIES_REPOSITORY_PORT,
      useExisting: KyselyCategoriesRepositoryAdapter,
    },
  ],
})
export class CategoriesModule {}
