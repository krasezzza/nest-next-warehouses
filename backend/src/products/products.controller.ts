import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './product.entity';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService
  ) { }

  @Get()
  async findAll(): Promise<Product[]> {
    return await this.productsService.findAll();
  }

  @Get('by-type/hazardous')
  async findHazardous(): Promise<Product[]> {
    return await this.productsService.findHazardous();
  }

  @Get('by-type/nonhazardous')
  async findNonhazardous(): Promise<Product[]> {
    return await this.productsService.findNonhazardous();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Product> {
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
