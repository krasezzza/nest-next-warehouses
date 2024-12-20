import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movement } from './movement.entity';
import { StocksService } from '../stocks/stocks.service';
import { MovementHandlerFactory } from './factories/movement-handler.factory';
import { MovementTypeValidator } from '../movement-validation/validators/movement-type.validator';

@Injectable()
export class MovementsService {
  constructor(
    @InjectRepository(Movement)
    private readonly movementRepository: Repository<Movement>,
    private readonly stocksService: StocksService,
    private readonly movementHandlerFactory: MovementHandlerFactory,
    private readonly typeValidator: MovementTypeValidator,
  ) { }

  findByWarehouse(warehouseId: number): Promise<Movement[]> {
    return this.movementRepository.find({ where: { warehouseId } });
  }

  async createRecord(record: Movement): Promise<Movement> {
    // Validate warehouse and product types compatibility
    await this.typeValidator.validateTypes(record);

    // Create and save the movement record
    const recordCreated = this.movementRepository.create(record);
    const recordSaved = await this.movementRepository.save(recordCreated);

    // Get the related stock
    const relatedStock = await this.stocksService.findOneByWarehouse(record.warehouseId);

    // Process the movement using the appropriate handler
    const handler = this.movementHandlerFactory.getHandler(record.type);
    await handler.handleMovement(record, relatedStock);

    // Update the stock at the end
    await this.stocksService.updateStock(relatedStock.id, relatedStock);

    return recordSaved;
  }

  async clearRecords(): Promise<void> {
    const loadedList = await this.movementRepository.find();
    const ids = loadedList.map((record) => record.id);
    await this.movementRepository.delete(ids);
  }
}
