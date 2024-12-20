'use client';

import {
  getHazardousProducts,
  getNonhazardousProducts,
  getWarehouseStock,
} from '@/api';
import ButtonLink from '@/components/ButtonLink';
import SelectList from '@/components/SelectList';
import WarehouseMovementCreate from '@/components/warehouses/WarehouseMovementCreate';
import WarehouseMovements from '@/components/warehouses/WarehouseMovements';
import { useMainContext } from '@/context/MainContext';
import { WarehouseData, WarehouseStock } from '@/interfaces';
import { useEffect, useState } from 'react';

export default function Warehouses() {
  const { warehousesList } = useMainContext();

  const [currentWarehouse, setCurrentWarehouse] = useState<WarehouseData>(
    warehousesList[0],
  );
  const [currentWarehouseStock, setCurrentWarehouseStock] =
    useState<WarehouseStock | null>(null);
  const [renderKey, setRenderKey] = useState(0);

  useEffect(() => {
    if (currentWarehouse?.id > 0) {
      getWarehouseStock(currentWarehouse.id).then((res) => {
        if (res.data) {
          setCurrentWarehouseStock(res.data);
        }
      });
    }
  }, [currentWarehouse]);

  const maxStock = () => {
    let result = 0;

    if (currentWarehouseStock?.maxCapacity) {
      result = currentWarehouseStock.maxCapacity;
    }

    return result;
  };

  const usedStock = () => {
    let result = 0;

    if (currentWarehouseStock?.usedCapacity) {
      result = currentWarehouseStock.usedCapacity;
    }

    return result;
  };

  const freeStock = () => {
    let result = 0;

    if (
      currentWarehouseStock?.maxCapacity ||
      currentWarehouseStock?.usedCapacity
    ) {
      result =
        currentWarehouseStock.maxCapacity - currentWarehouseStock.usedCapacity;
    }

    return result;
  };

  const handleWarehouseSwitch = (value: WarehouseData) => {
    setCurrentWarehouse(value);
    if (currentWarehouse?.id !== value.id) {
      setRenderKey(renderKey + 1);
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

      {currentWarehouse && currentWarehouse.id > 0 ? (
        <>
          <div
            key={currentWarehouse.id}
            className="py-[24px] flex items-center justify-between"
          >
            <span>Max Capacity: {maxStock()}</span>

            <span>Current Stock: {usedStock()}</span>

            <span>Free Space: {freeStock()}</span>
          </div>

          <div className="flex flex-col gap-y-[24px] items-center justify-center">
            <WarehouseMovementCreate
              data={currentWarehouse}
              freeStock={freeStock}
              updateRenderKey={() => setRenderKey(renderKey + 1)}
            />

            <WarehouseMovements renderKey={renderKey} data={currentWarehouse} />
          </div>
        </>
      ) : null}
    </div>
  );
}
