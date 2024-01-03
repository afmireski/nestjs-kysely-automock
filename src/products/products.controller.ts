import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { GetByUUID } from '../global/dtos/get-by-id.dto';
import { CreateProductBody } from './dtos/create-product-body.dto';
import { FindAllProductsDto } from './dtos/find-all-products.dto';
import { UpdateProductBody } from './dtos/update-product-body.dto';
import { ProductEntity } from './entities/product.entity';
import { ProductsService } from './products.service';
import * as Swagger from '@nestjs/swagger';
import { ProductDto } from './dtos/product.dto';

@Swagger.ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get(':id')
  async findById(@Param() params: GetByUUID): Promise<ProductDto> {
    return this.productsService.findById(params.id);
  }

  @Get()
  async list(@Query() query: FindAllProductsDto): Promise<Array<ProductDto>> {
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
  ): Promise<ProductDto> {
    return this.productsService.update({ ...params, data: body });
  }

  @Delete('/delete/:id')
  @HttpCode(204)
  async delete(@Param() params: GetByUUID): Promise<void> {
    return this.productsService.delete(params.id);
  }
}
