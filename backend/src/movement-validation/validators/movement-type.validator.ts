import { Injectable } from '@nestjs/common';
import { WarehousesService } from '../../warehouses/warehouses.service';
import { ProductsService } from '../../products/products.service';
import { Movement } from '../../movements/movement.entity';

@Injectable()
export class MovementTypeValidator {
  constructor(
    private readonly warehousesService: WarehousesService,
    private readonly productsService: ProductsService,
  ) {}

  async validateTypes(movement: Movement): Promise<void> {
    const warehouse = await this.warehousesService.findOne(movement.warehouseId);
    const product = await this.productsService.findOne(movement.productId);

    if (!warehouse || !product) {
      throw new Error('Warehouse or product not found');
    }

    if (warehouse.isHazardous !== product.isHazardous) {
      throw new Error('Warehouse and product must have same hazard type');
    }
  }
}
