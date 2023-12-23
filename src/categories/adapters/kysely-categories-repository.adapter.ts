import { Injectable } from '@nestjs/common';
import { KyselyService } from '../../kysely/kysely.service';
import { CreateCategoryInput } from '../interfaces/create-category-input.interface';
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

  async create(input: CreateCategoryInput): Promise<CategoryModel> {
    return Promise.resolve(
      this.kyselyService.database
        .insertInto('categories')
        .values(input)
        .returning([
          'id',
          'name',
          'description',
          'created_at',
          'updated_at',
          'deleted_at',
        ])
        .executeTakeFirst(),
    );
  }
}
