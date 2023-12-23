import { Injectable } from '@nestjs/common';
import { KyselyService } from '../../kysely/kysely.service';
import { CreateCategoryInput } from '../interfaces/create-category-input.interface';
import { CategoryModel } from '../models/category.model';
import { CategoriesRepository } from '../ports/categories-repository.port';
import { FindAllCategoriesInput } from '../interfaces/find-all-categories-input.interface';

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

  async findAll(input?: FindAllCategoriesInput): Promise<CategoryModel[]> {
    const {
      pagination: { skip, take },
    } = input;

    return Promise.resolve(
      this.kyselyService.database
        .selectFrom('categories')
        .selectAll()
        .limit(take)
        .offset(skip)
        .execute(),
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
