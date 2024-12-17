'use client';

import { HistoryRecord, ProductItem, WarehouseData } from '@/interfaces';
import { AVAILABLE_WAREHOUSES_LIST } from '@/mocks';
import { createContext, useContext, useState } from 'react';

interface MainContextType {
  masterProductsList: ProductItem[];
  setMasterProductsList: (value: ProductItem[]) => void;

  warehousesList: WarehouseData[];
  setWarehousesList: (value: WarehouseData[]) => void;

  historicalData: HistoryRecord[];
  setHistoricalData: (value: HistoryRecord[]) => void;
}

const MainContext = createContext<MainContextType>({
  masterProductsList: [],
  setMasterProductsList: () => {},

  warehousesList: AVAILABLE_WAREHOUSES_LIST,
  setWarehousesList: () => {},

  historicalData: [],
  setHistoricalData: () => {},
});

const MainProvider = ({ children }: { children: React.ReactNode }) => {
  const [masterProductsList, setMasterProductsList] = useState<ProductItem[]>(
    [],
  );
  const [warehousesList, setWarehousesList] = useState<WarehouseData[]>(
    AVAILABLE_WAREHOUSES_LIST,
  );
  const [historicalData, setHistoricalData] = useState<HistoryRecord[]>([]);

  return (
    <MainContext.Provider
      value={{
        masterProductsList,
        setMasterProductsList,

        warehousesList,
        setWarehousesList,

        historicalData,
        setHistoricalData,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};
const useMainContext = (): MainContextType => useContext(MainContext);

export { MainProvider, useMainContext };
