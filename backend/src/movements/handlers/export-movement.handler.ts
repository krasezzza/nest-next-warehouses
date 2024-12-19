import { Injectable } from '@nestjs/common';
import { IMovementHandler } from '../interfaces/movement-handler.interface';
import { Movement } from '../movement.entity';
import { Stock } from '../../stocks/stock.entity';

@Injectable()
export class ExportMovementHandler implements IMovementHandler {
  async handleMovement(movement: Movement, stock: Stock): Promise<void> {
    stock.usedCapacity -= movement.amount;
  }
}
