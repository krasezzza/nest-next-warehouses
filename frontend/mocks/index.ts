import { EmptyProductItem, WarehouseData } from '@/interfaces';

export const EMPTY_PRODUCT_ITEM: EmptyProductItem = {
  id: 0,
  name: 'Select a product',
  isHazardous: false,
  quantity: 0,
};

export const EMPTY_WAREHOUSE: WarehouseData = {
  id: 0,
  name: 'Select a warehouse',
  isHazardous: false,
};
