import { Controller, Delete, Get, Post } from '@nestjs/common';
import { WarehousesService } from './warehouses.service';
import { Warehouse } from './warehouse.entity';

@Controller('warehouses')
export class WarehousesController {
  constructor(
    private warehousesService: WarehousesService
  ) { }

  @Get()
  async getAll(): Promise<Warehouse[]> {
    return await this.warehousesService.findAll();
  }

  @Post()
  async loadList(): Promise<Warehouse[]> {
    return await this.warehousesService.loadList();
  }

  @Delete()
  async clearList(): Promise<void> {
    await this.warehousesService.clearList();
  }
}
