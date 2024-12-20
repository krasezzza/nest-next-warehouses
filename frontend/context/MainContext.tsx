'use client';

import { getWarehousesList } from '@/api';
import { ProductItem, WarehouseData } from '@/interfaces';
import { EMPTY_WAREHOUSE } from '@/mocks';
import { createContext, useContext, useEffect, useState } from 'react';

interface MainContextType {
  masterProductsList: ProductItem[];
  setMasterProductsList: (value: ProductItem[]) => void;

  warehousesList: WarehouseData[];
  setWarehousesList: (value: WarehouseData[]) => void;
}

const MainContext = createContext<MainContextType>({
  masterProductsList: [],
  setMasterProductsList: () => {},

  warehousesList: [],
  setWarehousesList: () => {},
});

const MainProvider = ({ children }: { children: React.ReactNode }) => {
  const [masterProductsList, setMasterProductsList] = useState<ProductItem[]>(
    [],
  );
  const [warehousesList, setWarehousesList] = useState<WarehouseData[]>([]);

  useEffect(() => {
    getWarehousesList().then((res) => {
      if (res.data) {
        setWarehousesList([EMPTY_WAREHOUSE, ...res.data]);
      }
    });
  }, []);

  return (
    <MainContext.Provider
      value={{
        masterProductsList,
        setMasterProductsList,

        warehousesList,
        setWarehousesList,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};
const useMainContext = (): MainContextType => useContext(MainContext);

export { MainProvider, useMainContext };
