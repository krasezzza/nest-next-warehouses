'use client';

import { getProductsList } from '@/api';
import AddProductForm from '@/components/products/AddProductForm';
import MasterProductsList from '@/components/products/MasterProductsList';
import ButtonLink from '@/components/shared/ButtonLink';
import { useMainContext } from '@/context/MainContext';
import { useEffect, useState } from 'react';

export default function Products() {
  const { setMasterProductsList } = useMainContext();
  const [renderKey, setRenderKey] = useState(0);

  useEffect(() => {
    getProductsList().then((res) => {
      if (res.data) {
        setMasterProductsList(res.data);
      }
    });
  }, [renderKey]);

  return (
    <div className="p-[24px] flex flex-col items-center gap-y-[60px]">
      <ButtonLink route={'/warehouses'} label="Stock Management" />

      <AddProductForm updateRenderKey={() => setRenderKey(renderKey + 1)} />

      <MasterProductsList updateRenderKey={() => setRenderKey(renderKey + 1)} />
    </div>
  );
}
