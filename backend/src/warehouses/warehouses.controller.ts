import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { WarehousesService } from './warehouses.service';
import { Warehouse } from './warehouse.entity';

@Controller('warehouses')
export class WarehousesController {
  constructor(
    private readonly warehousesService: WarehousesService
  ) { }

  @Get()
  async getAll(): Promise<Warehouse[]> {
    return await this.warehousesService.findAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: number): Promise<Warehouse> {
    return await this.warehousesService.findOne(id);
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
