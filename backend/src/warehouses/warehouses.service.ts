import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Warehouse } from './warehouse.entity';
import { HazardousWarehouseCreator } from './creators/hazardous-warehouse.creator';
import { NonHazardousWarehouseCreator } from './creators/non-hazardous-warehouse.creator';

@Injectable()
export class WarehousesService {
  constructor(
    @InjectRepository(Warehouse)
    private readonly warehousesRepository: Repository<Warehouse>,
    private readonly hazardousCreator: HazardousWarehouseCreator,
    private readonly nonHazardousCreator: NonHazardousWarehouseCreator,
  ) { }

  async findAll(): Promise<Warehouse[]> {
    return await this.warehousesRepository.find();
  }

  async findOne(id: number): Promise<Warehouse> {
    return this.warehousesRepository.findOne({ where: { id } });
  }

  async loadList(): Promise<Warehouse[]> {
    const hazardousWarehouse = await this.hazardousCreator.createWarehouse();
    const nonHazardousWarehouse = await this.nonHazardousCreator.createWarehouse();

    return [hazardousWarehouse, nonHazardousWarehouse];
  }

  async clearList(): Promise<void> {
    await this.warehousesRepository.clear();
  }
}
