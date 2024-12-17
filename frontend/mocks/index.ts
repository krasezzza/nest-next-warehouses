import { EmptyProductItem, WarehouseData } from '@/interfaces';

export const EMPTY_PRODUCT_ITEM: EmptyProductItem = {
  id: 0,
  name: 'Select a product',
  amount: 0,
  isHazardous: false,
};

export const AVAILABLE_WAREHOUSES_LIST: WarehouseData[] = [
  {
    id: 0,
    name: 'Select a warehouse',
    maxCapacity: 0,
    isHazardous: false,
  },
  {
    id: 1,
    name: 'Warehouse 01',
    maxCapacity: 100,
    isHazardous: false,
  },
  {
    id: 2,
    name: 'Warehouse 02',
    maxCapacity: 50,
    isHazardous: true,
  },
];
