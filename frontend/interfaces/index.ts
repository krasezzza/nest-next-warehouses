export interface WarehouseData {
  id: number;
  name: string;
  isHazardous: boolean;
}

export interface WarehouseStock {
  id: number;
  warehouseId: number;
  maxCapacity: number;
  usedCapacity: number;
}

export interface WarehouseMovement {
  id: number;
  warehouseId: number;
  productId: number;
  amount: number;
  type: 'import' | 'export';
  timestamp: number;
}

export interface ProductItem {
  id: number;
  name: string;
  isHazardous: boolean;
  quantity: number;
}

export interface EmptyProductItem extends ProductItem {
  // has all the properties of ProductItem
}
