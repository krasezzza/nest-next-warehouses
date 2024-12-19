import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { MovementsService } from './movements.service';
import { Movement } from './movement.entity';

@Controller('movements')
export class MovementsController {
  constructor(private readonly movementsService: MovementsService) { }

  @Get(':warehouseId')
  async getByWarehouse(@Param('warehouseId') warehouseId: number): Promise<Movement[]> {
    return await this.movementsService.findByWarehouse(warehouseId);
  }

  @Post()
  async createRecord(@Body() record: Movement): Promise<Movement> {
    return await this.movementsService.createRecord(record);
  }

  @Delete()
  async clearRecords(): Promise<void> {
    await this.movementsService.clearRecords();
  }
}
