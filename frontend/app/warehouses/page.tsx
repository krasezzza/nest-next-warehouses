'use client';

import ButtonLink from '@/components/ButtonLink';
import ButtonPrimary from '@/components/ButtonPrimary';
import InputText from '@/components/InputText';
import SelectList from '@/components/SelectList';
import { useMainContext } from '@/context/MainContext';
import {
  EmptyProductItem,
  HistoryRecord,
  ProductItem,
  WarehouseData,
} from '@/interfaces';
import { EMPTY_PRODUCT_ITEM } from '@/mocks';
import { useEffect, useState } from 'react';

export default function Warehouses() {
  const {
    masterProductsList,
    warehousesList,
    historicalData,
    setHistoricalData,
  } = useMainContext();

  const [currentProductItem, setCurrentProductItem] = useState<
    ProductItem | EmptyProductItem
  >(EMPTY_PRODUCT_ITEM);
  const [currentWarehouse, setCurrentWarehouse] = useState<WarehouseData>(
    warehousesList[0],
  );
  const [currentWarehouseHistoricalData, setCurrentWarehouseHistoricalData] =
    useState<HistoryRecord[]>([]);
  const [quantityValue, setQuantityValue] = useState(0);

  useEffect(() => {
    const filteredHistoricalData = historicalData.filter(
      (data) => data.warehouseId === currentWarehouse.id,
    );
    setCurrentWarehouseHistoricalData(filteredHistoricalData);
  }, [currentWarehouse, historicalData]);

  const currentStock = () => {
    return currentWarehouseHistoricalData.reduce((total, item) => {
      return total + item.quantity;
    }, 0);
  };

  const remainingSpace = () => {
    return currentWarehouse.maxCapacity - currentStock();
  };

  const resetProductValues = () => {
    setQuantityValue(0);
    setCurrentProductItem(EMPTY_PRODUCT_ITEM);
  };

  const handleWarehouseSwitch = (value: WarehouseData) => {
    setCurrentWarehouse(value);
    if (currentWarehouse.id !== value.id) {
      setCurrentProductItem(EMPTY_PRODUCT_ITEM);
    }
  };

  const handleQuantityValueInput = (value: string) => {
    let result = Number(value);
    if (isNaN(result)) {
      result = 0;
    }
    if (result > currentProductItem.amount) {
      result = currentProductItem.amount;
    }
    if (result > remainingSpace()) {
      result = remainingSpace();
    }
    setQuantityValue(result);
  };

  const handleImportExport = () => {
    if (quantityValue != 0) {
      const newHistoryItem: HistoryRecord = {
        id: historicalData.length + 1,
        warehouseId: currentWarehouse.id,
        type: 'export',
        productName: currentProductItem.name,
        quantity: quantityValue,
      };

      if (quantityValue > 0) {
        newHistoryItem.type = 'import';
      }

      setHistoricalData([...historicalData, newHistoryItem]);
      resetProductValues();
    }
  };

  return (
    <div className="p-[24px] flex flex-col gap-y-[24px]">
      <ButtonLink route={'/'} label="Product Entry" />

      <div className="flex items-center justify-center">
        <SelectList
          options={warehousesList}
          setCurrentOption={handleWarehouseSwitch}
        />
      </div>

      {currentWarehouse.id > 0 ? (
        <>
          <div
            key={historicalData.length}
            className="py-[24px] flex items-center justify-between"
          >
            <span>Current Stock: {currentStock()}</span>

            <span className="italic">
              {currentWarehouse.isHazardous ? 'Hazardous' : 'Non-Hazardous'}
            </span>

            <span>Free Space: {remainingSpace()}</span>
          </div>

          <div className="flex flex-col gap-y-[24px] items-center justify-center">
            <span className="text-center">Imports/Exports</span>

            <div
              key={currentWarehouse.id}
              className="w-full flex justify-between"
            >
              <SelectList
                options={[
                  EMPTY_PRODUCT_ITEM,
                  ...masterProductsList.filter(
                    (item) => item.isHazardous === currentWarehouse.isHazardous,
                  ),
                ]}
                setCurrentOption={setCurrentProductItem}
              />

              {currentProductItem.id > 0 ? (
                <>
                  <InputText
                    value={quantityValue.toString()}
                    placeholder="Enter quantity value"
                    onChangeHandler={handleQuantityValueInput}
                  />

                  <ButtonPrimary
                    label="Submit"
                    onClickHandler={handleImportExport}
                  />
                </>
              ) : null}
            </div>

            {currentWarehouseHistoricalData.length > 0 ? (
              <>
                <span>Historical Data</span>

                <ul className="w-full px-[24px] py-[12px] flex flex-col gap-y-[6px] rounded border border-solid border-white">
                  {currentWarehouseHistoricalData.map(
                    (historyItem: HistoryRecord) => (
                      <li
                        key={historyItem.id}
                        className="pl-[12px] grid grid-rows-1 grid-cols-[15%_45%_30%_auto] items-center justify-start"
                      >
                        <span>{historyItem.type}</span>
                        <span>{historyItem.productName}</span>
                        <span>
                          {currentWarehouse.isHazardous
                            ? 'hazardous'
                            : 'non-hazardous'}
                        </span>
                        <span>{historyItem.quantity}</span>
                      </li>
                    ),
                  )}
                </ul>
              </>
            ) : null}
          </div>
        </>
      ) : null}
    </div>
  );
}
