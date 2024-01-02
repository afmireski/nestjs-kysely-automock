import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { GetByUUID } from '../global/dtos/get-by-id.dto';
import { FindAllProductsDto } from './dtos/find-all-products.input';
import { ProductEntity } from './entities/product.entity';
import { ProductsService } from './products.service';
import { CreateProductBody } from './dtos/create-product.body';
import { UpdateProductBody } from './dtos/update-product.body';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get(':id')
  async findById(@Param() params: GetByUUID): Promise<ProductEntity> {
    return this.productsService.findById(params.id);
  }

  @Get()
  async list(
    @Query() query: FindAllProductsDto,
  ): Promise<Array<ProductEntity>> {
    return this.productsService.list(query);
  }

  @Post('new')
  async create(@Body() input: CreateProductBody): Promise<void> {
    return this.productsService.create(input);
  }

  @Patch('/update/:id')
  async update(
    @Body() body: UpdateProductBody,
    @Param() params: GetByUUID,
  ): Promise<ProductEntity> {
    return this.productsService.update({ ...params, data: body });
  }
}
