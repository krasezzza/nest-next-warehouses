'use client';

import { deleteProduct } from '@/api';
import { useMainContext } from '@/context/MainContext';
import { ProductItem } from '@/interfaces';
import ButtonSecondary from '../shared/ButtonSecondary';

export default function MasterProductsList({
  updateRenderKey,
}: {
  updateRenderKey: () => void;
}) {
  const { masterProductsList } = useMainContext();

  const handleProductRemove = (productItem: ProductItem) => {
    deleteProduct(productItem.id).then((res) => {
      if (res.data) {
        updateRenderKey();
      }
    });
  };

  return (
    <div className="w-full">
      {masterProductsList.length > 0 ? (
        <ul className="px-[24px] py-[12px] flex flex-col gap-y-[6px] rounded border border-solid border-white">
          {masterProductsList.map((productsListItem: ProductItem) => (
            <li
              key={productsListItem.id}
              className="grid grid-rows-1 grid-cols-4 items-center justify-center select-none"
            >
              <span>Name: {productsListItem.name}</span>
              <span>Quantity: {productsListItem.quantity}</span>
              <span>
                Hazardous: {productsListItem.isHazardous ? 'Yes' : 'No'}
              </span>

              <ButtonSecondary
                label="Remove"
                onClickHandler={() => {
                  handleProductRemove(productsListItem);
                }}
              />
            </li>
          ))}
        </ul>
      ) : (
        <div className="py-[24px] flex items-center justify-center">
          No products available
        </div>
      )}
    </div>
  );
}
