import { Warehouse } from '../warehouse.entity';

export interface IWarehouseCreator {
  createWarehouse(): Promise<Warehouse>;
}
