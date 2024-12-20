import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Stock } from './stock.entity';
import { Warehouse } from '../warehouses/warehouse.entity';

@Injectable()
export class StocksService {
  constructor(
    @InjectRepository(Stock)
    private stocksRepository: Repository<Stock>,
  ) { }

  async findAll(): Promise<Stock[]> {
    return await this.stocksRepository.find();
  }

  async findOneByWarehouse(warehouseId: number): Promise<Stock> {
    return await this.stocksRepository.findOne({ where: { warehouseId } });
  }

  async createStock(warehouse: Warehouse, capacity: number): Promise<Stock> {
    const warehouseStockCreated = this.stocksRepository.create({
      warehouseId: warehouse.id,
      maxCapacity: capacity,
      usedCapacity: 0,
    });

    return await this.stocksRepository.save(warehouseStockCreated);
  }

  async updateStock(id: number, stock: Partial<Stock>): Promise<Stock> {
    await this.stocksRepository.update(id, stock);
    return await this.stocksRepository.findOne({ where: { id } });
  }

  async clearList(): Promise<void> {
    const loadedList = await this.stocksRepository.find();
    const ids = loadedList.map((stock) => stock.id);
    await this.stocksRepository.delete(ids);
  }
}
