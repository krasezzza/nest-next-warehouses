export interface ProductItem {
  id: number;
  name: string;
  amount: number;
  isHazardous: boolean;
}

export interface EmptyProductItem extends ProductItem {}

export interface WarehouseData {
  id: number;
  name: string;
  maxCapacity: number;
  isHazardous: boolean;
}

export interface HistoryRecord {
  id: number;
  warehouseId: number;
  type: 'import' | 'export';
  productName: string;
  quantity: number;
}
