import { Controller, Get, Param } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoryEntity } from './entities/category.entity';
import { GetByUUID } from 'src/global/dtos/get-by-id.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get(':id')
  async findById(@Param() params: GetByUUID): Promise<CategoryEntity> {
    return this.categoriesService.findById(params.id);
  }
}
