import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IWarehouseCreator } from '../interfaces/warehouse-creator.interface';
import { Warehouse } from '../warehouse.entity';
import { StocksService } from '../../stocks/stocks.service';

@Injectable()
export class NonHazardousWarehouseCreator implements IWarehouseCreator {
  private readonly WAREHOUSE_NAME = 'Warehouse 002';
  private readonly INITIAL_CAPACITY = 100;

  constructor(
    @InjectRepository(Warehouse)
    private readonly warehousesRepository: Repository<Warehouse>,
    private readonly stocksService: StocksService,
  ) {}

  async createWarehouse(): Promise<Warehouse> {
    const existingWarehouse = await this.warehousesRepository.findOne({
      where: { name: this.WAREHOUSE_NAME },
    });

    if (existingWarehouse) {
      return existingWarehouse;
    }

    const warehouse = this.warehousesRepository.create({
      name: this.WAREHOUSE_NAME,
      isHazardous: false,
    });
    
    const savedWarehouse = await this.warehousesRepository.save(warehouse);
    await this.stocksService.createStock(savedWarehouse, this.INITIAL_CAPACITY);
    
    return savedWarehouse;
  }
}
