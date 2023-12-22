import { Inject, Injectable } from '@nestjs/common';
import {
  CATEGORIES_REPOSITORY_PORT,
  CategoriesRepository,
} from './ports/categories-repository.port';
import { CategoryEntity } from './entities/category.entity';
import { InternalException } from 'src/exception-handling/internal.exception';

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
}
