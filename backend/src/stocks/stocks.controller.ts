import { Controller, Delete, Get, Param } from '@nestjs/common';
import { StocksService } from './stocks.service';
import { Stock } from './stock.entity';

@Controller('stocks')
export class StocksController {
  constructor(
    private readonly stocksService: StocksService
  ) { }

  @Get()
  async getAll(): Promise<Stock[]> {
    return await this.stocksService.findAll();
  }

  @Get('by-warehouse/:warehouseId')
  async getOneByWarehouse(@Param('warehouseId') warehouseId: number): Promise<Stock> {
    return await this.stocksService.findOneByWarehouse(warehouseId);
  }

  @Delete()
  async clearList(): Promise<void> {
    await this.stocksService.clearList();
  }
}
