import { Module } from '@nestjs/common';
import { MovementTypeValidator } from './validators/movement-type.validator';
import { WarehousesModule } from '../warehouses/warehouses.module';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [
    WarehousesModule,
    ProductsModule,
  ],
  providers: [MovementTypeValidator],
  exports: [MovementTypeValidator],
})
export class MovementValidationModule {}
