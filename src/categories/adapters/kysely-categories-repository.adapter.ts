import { Injectable } from '@nestjs/common';
import { KyselyService } from '../../kysely/kysely.service';
import { CategoryModel } from '../models/category.model';
import { CategoriesRepository } from '../ports/categories-repository.port';

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
