import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoryEntity } from './entities/category.entity';
import { GetByUUID } from 'src/global/dtos/get-by-id.dto';
import { CreateCategoryDto } from './dtos/create-category-input.dto';
import { FindAllCategoriesDto } from './dtos/find-all-categories-input.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get(':id')
  async findById(@Param() params: GetByUUID): Promise<CategoryEntity> {
    return this.categoriesService.findById(params.id);
  }

  @Get()
  async list(
    @Query() query: FindAllCategoriesDto,
  ): Promise<Array<CategoryEntity>> {
    return this.categoriesService.list(query);
  }

  @Post('new')
  async create(@Body() body: CreateCategoryDto): Promise<void> {
    return this.categoriesService.create(body);
  }
}
