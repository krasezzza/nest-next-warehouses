'use client';

import { getWarehouseMovements } from '@/api';
import { WarehouseData, WarehouseMovement } from '@/interfaces';
import { useEffect, useState } from 'react';

export default function WarehouseMovements({
  renderKey,
  data,
}: {
  renderKey: number;
  data: WarehouseData;
}) {
  const [historicalData, setHistoricalData] = useState<WarehouseMovement[]>([]);

  useEffect(() => {
    if (data.id > 0) {
      getWarehouseMovements(data.id).then((res) => {
        if (res.data) {
          setHistoricalData(res.data);
        }
      });
    }
  }, [renderKey, data.id]);

  return historicalData.length > 0 ? (
    <>
      <span>Historical Data</span>

      <ul className="w-full px-[24px] py-[12px] flex flex-col gap-y-[6px] rounded border border-solid border-white">
        {historicalData.map((movementData: WarehouseMovement) => (
          <li
            key={movementData.id}
            className="pl-[12px] grid grid-rows-1 grid-cols-[15%_25%_25%_auto] items-center justify-start"
          >
            <span>{movementData.type}</span>
            <span>Product: {movementData.productId}</span>
            <span>Amount: {movementData.amount}</span>
            <span>
              {new Date(movementData.timestamp * 1000).toLocaleString()}
            </span>
          </li>
        ))}
      </ul>
    </>
  ) : (
    <span>No historical data</span>
  );
}
