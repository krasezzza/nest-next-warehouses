'use client';

import { createContext, useContext, useState } from 'react';
import { ProductItem } from '@/interfaces';

interface MainContextType {
  masterProductsList: ProductItem[];
  setMasterProductsList: (value: ProductItem[]) => void;
}

const MainContext = createContext<MainContextType>({
  masterProductsList: [],
  setMasterProductsList: () => { },
});

const MainProvider = ({ children }: { children: React.ReactNode }) => {
  const [masterProductsList, setMasterProductsList] = useState<ProductItem[]>([]);

  return (
    <MainContext.Provider
      value={{
        masterProductsList,
        setMasterProductsList,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};
const useMainContext = (): MainContextType => useContext(MainContext);

export { MainProvider, useMainContext };
