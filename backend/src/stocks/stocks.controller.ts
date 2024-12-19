import { Controller, Delete, Get } from '@nestjs/common';
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

  @Delete()
  async clearList(): Promise<void> {
    await this.stocksService.clearList();
  }
}
