import { Controller, Get, Param } from '@nestjs/common';
import { ProductsService } from './products.service';
import { GetByUUID } from '../global/dtos/get-by-id.dto';
import { ProductEntity } from './entities/product.entity';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get(':id')
  async findById(@Param() params: GetByUUID): Promise<ProductEntity> {
    return this.productsService.findById(params.id);
  }
}
