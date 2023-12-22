import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from '../ports/categories-repository.port';
import { Category } from 'kysely/kysely-types';
import { KyselyService } from 'src/kysely/kysely.service';
import { CategoryModel } from '../models/category.model';

@Injectable()
export class KyselyCategoriesRepositoryAdapter implements CategoriesRepository {
  constructor(private readonly kyselyService: KyselyService) {}

  async findById(id: string): Promise<CategoryModel> {
    return Promise.resolve(
      this.kyselyService.database
        .selectFrom('categories')
        .selectAll()
        .where('id', '=', id)
        .executeTakeFirst(),
    );
  }
}
