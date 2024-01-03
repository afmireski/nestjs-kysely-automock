import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoryEntity } from './entities/category.entity';
import { GetByUUID } from '../global/dtos/get-by-id.dto';
import { CreateCategoryDto } from './dtos/create-category-input.dto';
import { PaginationDto } from '../global/dtos/pagination.dto';
import { UpdateCategoryBody } from './dtos/update-category-body.dto';
import * as Swagger from '@nestjs/swagger';
import { CategoryDto } from './dtos/category.dto';

@Swagger.ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get(':id')
  async findById(@Param() params: GetByUUID): Promise<CategoryDto> {
    return this.categoriesService.findById(params.id);
  }

  @Get()
  async list(@Query() query: PaginationDto): Promise<Array<CategoryDto>> {
    return this.categoriesService.list(query);
  }

  @Post('new')
  async create(@Body() body: CreateCategoryDto): Promise<void> {
    return this.categoriesService.create(body);
  }

  @Patch('/update/:id')
  async update(
    @Param() params: GetByUUID,
    @Body() body: UpdateCategoryBody,
  ): Promise<CategoryDto> {
    return this.categoriesService.update({ ...params, ...body });
  }

  @Delete('/delete/:id')
  async delete(@Param() params: GetByUUID): Promise<void> {
    return this.categoriesService.delete(params.id);
  }
}
