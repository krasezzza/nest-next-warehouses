import { Movement } from '../movement.entity';
import { Stock } from '../../stocks/stock.entity';

export interface IMovementHandler {
  handleMovement(movement: Movement, stock: Stock): Promise<void>;
}
