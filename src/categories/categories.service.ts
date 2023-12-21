import { Inject, Injectable } from '@nestjs/common';
import {
  CATEGORIES_REPOSITORY_PORT,
  CategoriesRepository,
} from './ports/categories-repository.port';
import { CategoryEntity } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @Inject(CATEGORIES_REPOSITORY_PORT)
    private readonly repository: CategoriesRepository,
  ) {}

  async findById(id: string): Promise<CategoryEntity> {
    return Promise.resolve(this.repository.findById(id)).then(
      (repositoryData) => {
        // Todo not found exception

        const { updated_at, ...response } = repositoryData;

        return response;
      },
    );
  }
}
