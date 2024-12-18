import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './product.entity';

@Controller('products')
export class ProductsController {
  constructor(
    private productsService: ProductsService
  ) { }

  @Get()
  async getAll(): Promise<Product[]> {
    return await this.productsService.findAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: number): Promise<Product> {
    const result = await this.productsService.findOne(id);

    if (!result) {
      throw new Error('Product not found');
    }

    return result;
  }

  @Post()
  async create(@Body() product: Product): Promise<Product> {
    return await this.productsService.create(product);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() product: Product): Promise<Product> {
    const result = await this.productsService.update(id, product);

    if (!result) {
      throw new Error('Product not found');
    }

    return result;
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<Product> {
    const result = await this.productsService.findOne(id);

    if (!result) {
      throw new Error('Product not found');
    }
    await this.productsService.delete(id);

    return result;
  }
}
