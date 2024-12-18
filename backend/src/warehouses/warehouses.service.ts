import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Warehouse } from './warehouse.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WarehousesService {
  constructor(
    @InjectRepository(Warehouse)
    private warehousesRepository: Repository<Warehouse>,
  ) { }

  async findAll(): Promise<Warehouse[]> {
    return await this.warehousesRepository.find();
  }

  async loadList(): Promise<Warehouse[]> {
    const hazardousWarehouse = this.warehousesRepository.create({
      name: 'Warehouse 001',
      maxCapacity: 75,
      isHazardous: true,
    });
    await this.warehousesRepository.save(hazardousWarehouse);

    const nonhazardousWarehouse = this.warehousesRepository.create({
      name: 'Warehouse 002',
      maxCapacity: 100,
      isHazardous: false,
    });
    await this.warehousesRepository.save(nonhazardousWarehouse);

    return await this.warehousesRepository.find();
  }

  async clearList(): Promise<void> {
    const loadedList = await this.warehousesRepository.find();
    const ids = loadedList.map((warehouse) => warehouse.id);
    await this.warehousesRepository.delete(ids);
  }
}
