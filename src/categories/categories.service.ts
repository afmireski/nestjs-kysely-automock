import { Inject, Injectable } from '@nestjs/common';
import {
  CATEGORIES_REPOSITORY_PORT,
  CategoriesRepository,
} from './ports/categories-repository.port';
import { CategoryEntity } from './entities/category.entity';
import { InternalException } from '../exception-handling/internal.exception';
import { CreateCategoryInput } from './interfaces/create-category-input.interface';
import { FindAllCategoriesInput } from './interfaces/find-all-categories-input.interface';

@Injectable()
export class CategoriesService {
  constructor(
    @Inject(CATEGORIES_REPOSITORY_PORT)
    private readonly repository: CategoriesRepository,
  ) {}

  async findById(id: string): Promise<CategoryEntity> {
    return Promise.resolve(
      this.repository.findById(id).catch((_) => {
        throw new InternalException(102);
      }),
    ).then((repositoryData) => {
      if (!repositoryData) throw new InternalException(101);

      const { updated_at, ...response } = repositoryData;

      return response;
    });
  }

  async list(input: FindAllCategoriesInput): Promise<Array<CategoryEntity>> {
    return Promise.resolve(this.repository.findAll(input))
      .then((repositoryData) =>
        repositoryData.map(({ updated_at, ...rest }) => rest),
      )
      .catch((_) => {
        throw new InternalException(104);
      });
  }

  async create(input: CreateCategoryInput): Promise<void> {
    await Promise.resolve(this.repository.create(input)).catch((_) => {
      throw new InternalException(103);
    });
  }
}
