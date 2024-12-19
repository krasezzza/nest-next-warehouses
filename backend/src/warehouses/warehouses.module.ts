import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Warehouse } from './warehouse.entity';
import { WarehousesController } from './warehouses.controller';
import { WarehousesService } from './warehouses.service';
import { StocksModule } from '../stocks/stocks.module';
import { HazardousWarehouseCreator } from './creators/hazardous-warehouse.creator';
import { NonHazardousWarehouseCreator } from './creators/non-hazardous-warehouse.creator';

@Module({
  imports: [
    TypeOrmModule.forFeature([Warehouse]),
    StocksModule,
  ],
  providers: [
    WarehousesService,
    HazardousWarehouseCreator,
    NonHazardousWarehouseCreator,
  ],
  controllers: [WarehousesController],
  exports: [WarehousesService],
})
export class WarehousesModule { }
