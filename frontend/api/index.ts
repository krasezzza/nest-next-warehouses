import {
  ProductItem,
  WarehouseData,
  WarehouseMovement,
  WarehouseStock,
} from '@/interfaces';

export type APIResponse<T> = {
  data: T;
  status: number;
  error?: string;
};

export const apiRequest = async <T>(
  endpoint: string,
  options: RequestInit,
): Promise<APIResponse<T>> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/${endpoint}`,
    {
      ...options,
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

  const data = await response.json();

  return {
    data: data as T,
    status: response.status,
    error: data.message as string | undefined,
  };
};

export const getProductsList = () => {
  return apiRequest<ProductItem[]>(`products`, {
    method: 'GET',
  });
};

export const getHazardousProducts = () => {
  return apiRequest<ProductItem[]>(`products/by-type/hazardous`, {
    method: 'GET',
  });
};

export const getNonhazardousProducts = () => {
  return apiRequest<ProductItem[]>(`products/by-type/nonhazardous`, {
    method: 'GET',
  });
};

export const createProduct = (data: Partial<ProductItem>) => {
  return apiRequest<ProductItem>(`products`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

export const deleteProduct = (productId: number) => {
  return apiRequest<ProductItem>(`products/${productId}`, {
    method: 'DELETE',
  });
};

export const getWarehousesList = () => {
  return apiRequest<WarehouseData[]>(`warehouses`, {
    method: 'GET',
  });
};

export const getWarehouseMovements = (warehouseId: number) => {
  return apiRequest<WarehouseMovement[]>(`movements/${warehouseId}`, {
    method: 'GET',
  });
};

export const createMovementRecord = (data: Partial<WarehouseMovement>) => {
  return apiRequest<WarehouseMovement>(`movements`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

export const getWarehouseStock = (warehouseId: number) => {
  return apiRequest<WarehouseStock>(`stocks/by-warehouse/${warehouseId}`, {
    method: 'GET',
  });
};
