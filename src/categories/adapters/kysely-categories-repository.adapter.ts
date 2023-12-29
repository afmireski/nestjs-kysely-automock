import { Injectable } from '@nestjs/common';
import { Pagination } from 'src/global/interfaces/pagination';
import { KyselyService } from '../../kysely/kysely.service';
import { CreateCategoryInput } from '../interfaces/create-category-input.interface';
import { CategoryModel } from '../models/category.model';
import { CategoriesRepository } from '../ports/categories-repository.port';
import { UpdateCategoryInput } from '../interfaces/update-category-input.interface';

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

  async findAll(input?: Pagination): Promise<CategoryModel[]> {
    const { skip, take } = input;

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

  async update(input: UpdateCategoryInput): Promise<CategoryModel> {
    const { id, ...updatableData } = input;
    return Promise.resolve(
      this.kyselyService.database
        .updateTable('categories')
        .set({
          ...updatableData,
          updated_at: new Date(),
        })
        .where('id', '=', id)
        .returningAll()
        .executeTakeFirst(),
    );
  }
}
