import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from '../ports/categories-repository.port';
import { Category } from 'kysely/kysely-types';
import { KyselyService } from 'src/kysely/kysely.service';

@Injectable()
export class KyselyCategoriesRepositoryAdapter implements CategoriesRepository {
  constructor(private readonly kyselyService: KyselyService) {}

  async findById(id: string): Promise<Category> {
    throw new Error('Method not implemented.');
  }
}
