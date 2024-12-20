'use client';

import { createMovementRecord, getHazardousProducts, getNonhazardousProducts } from '@/api';
import { useMainContext } from '@/context/MainContext';
import {
  EmptyProductItem,
  ProductItem,
  WarehouseData,
  WarehouseMovement,
} from '@/interfaces';
import { EMPTY_PRODUCT_ITEM } from '@/mocks';
import { useEffect, useState } from 'react';
import ButtonPrimary from '../ButtonPrimary';
import InputText from '../InputText';
import SelectList from '../SelectList';

export default function WarehouseMovementCreate({
  data,
  freeStock,
  updateRenderKey,
}: {
  data: WarehouseData;
  freeStock: () => number;
  updateRenderKey: () => void;
}) {
  const { masterProductsList, setMasterProductsList } = useMainContext();
  const [currentProductItem, setCurrentProductItem] = useState<
    ProductItem | EmptyProductItem
  >(EMPTY_PRODUCT_ITEM);
  const [amountValue, setAmountValue] = useState(0);

  useEffect(() => {
    if (data.isHazardous) {
      getHazardousProducts().then((res) => {
        if (res.data) {
          setMasterProductsList(res.data);
        }
      });
    } else {
      getNonhazardousProducts().then((res) => {
        if (res.data) {
          setMasterProductsList(res.data);
        }
      });
    }
  }, [data.id]);

  const resetProductValues = () => {
    setAmountValue(0);
    setCurrentProductItem(EMPTY_PRODUCT_ITEM);
    updateRenderKey();
  };

  const handleAmountValueInput = (value: string) => {
    let result = Number(value);
    if (isNaN(result)) {
      result = 0;
    }
    if (result > currentProductItem.quantity) {
      result = currentProductItem.quantity;
    }
    setAmountValue(result);
  };

  const handleImportExport = () => {
    if (amountValue != 0) {
      const newHistoryItem: Partial<WarehouseMovement> = {
        warehouseId: data.id,
        productId: currentProductItem.id,
        amount: amountValue,
        type: 'export',
        timestamp: Math.round(Date.now() / 1000),
      };

      if (amountValue > 0) {
        newHistoryItem.type = 'import';
      }

      createMovementRecord(newHistoryItem);
      resetProductValues();
    }
  };

  return data.id > 0 ? (
    <div className="py-[30px] w-full grid grid-rows-1 grid-cols-[30%_25%_25%_auto] items-center">
      <SelectList
        options={[
          EMPTY_PRODUCT_ITEM,
          ...masterProductsList,
        ]}
        setCurrentOption={setCurrentProductItem}
      />

      <span className="px-[30px] italic">
        {data.isHazardous ? 'Hazardous' : 'Non-Hazardous'}
      </span>

      {currentProductItem.id > 0 ? (
        <>
          <InputText
            value={amountValue.toString()}
            placeholder="Enter amount value"
            onChangeHandler={handleAmountValueInput}
            additionalWrapperClasses="max-w-[120px]"
          />

          <ButtonPrimary label="Submit" onClickHandler={handleImportExport} />
        </>
      ) : null}
    </div>
  ) : null;
}
