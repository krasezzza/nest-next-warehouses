'use client';

import ButtonLink from '@/components/ButtonLink';
import ButtonPrimary from '@/components/ButtonPrimary';
import ButtonSecondary from '@/components/ButtonSecondary';
import Checkbox from '@/components/Checkbox';
import InputText from '@/components/InputText';
import { useMainContext } from '@/context/MainContext';
import { ProductItem } from '@/interfaces';
import { useState } from 'react';

export default function Products() {
  const { masterProductsList, setMasterProductsList } = useMainContext();

  const [productName, setProductName] = useState('');
  const [productAmount, setProductAmount] = useState(0);
  const [productHazardous, setProductHazardous] = useState(false);

  const handleResetFields = () => {
    setProductName('');
    setProductAmount(0);
    setProductHazardous(false);
  };

  const handleProductIdCalc = () => {
    return masterProductsList.length + 1;
  };

  const handleProductNameInput = (value: string) => {
    setProductName(value);
  };

  const handleProductAmountInput = (value: string) => {
    let result = Number(value);
    if (isNaN(result)) {
      result = 0;
    }
    setProductAmount(result);
  };

  const handleProductSubmit = () => {
    if (!productName.length || !productAmount) {
      return;
    }

    const newProduct: ProductItem = {
      id: handleProductIdCalc(),
      name: productName,
      amount: productAmount,
      isHazardous: productHazardous,
    };

    handleResetFields();
    setMasterProductsList([...masterProductsList, newProduct]);
  };

  const handleProductRemove = (productItem: ProductItem) => {
    const filteredProductsList = masterProductsList.filter(
      (item) => item.id !== productItem.id,
    );

    setMasterProductsList(filteredProductsList);
  };

  return (
    <div className="p-[24px] flex flex-col gap-y-[24px]">
      <ButtonLink route={'/warehouses'} label="Stock Management" />

      <div className="grid grid-rows-3 grid-cols-2 gap-[18px]">
        <div className="flex gap-x-[18px] items-center justify-end">
          <label className="text-sm">ID:</label>
          <InputText
            key={handleProductIdCalc()}
            value={handleProductIdCalc().toString()}
            placeholder="Product ID"
            isReadOnly={true}
          />
        </div>

        <div className="flex gap-x-[12px] items-center justify-start">
          <label className="text-sm">Name:</label>
          <InputText
            value={productName}
            placeholder="Product Name"
            onChangeHandler={handleProductNameInput}
          />
        </div>

        <div className="flex gap-x-[12px] items-center justify-end">
          <label className="text-sm">Amount:</label>
          <InputText
            value={productAmount.toString()}
            placeholder="Product Amount"
            onChangeHandler={handleProductAmountInput}
          />
        </div>

        <div className="flex gap-x-[12px] items-center justify-start">
          <label
            className="text-sm cursor-pointer select-none"
            onClick={() => setProductHazardous(!productHazardous)}
          >
            Is hazardous?
          </label>
          <Checkbox
            checked={productHazardous}
            onChangeHandler={setProductHazardous}
          />
        </div>

        <div className="col-span-2 flex items-center justify-center">
          <ButtonPrimary
            label="Submit"
            onClickHandler={handleProductSubmit}
            additionalButtonClasses="w-[180px]"
          />
        </div>
      </div>

      {masterProductsList.length > 0 ? (
        <ul className="px-[24px] py-[12px] flex flex-col gap-y-[6px] rounded border border-solid border-white">
          {masterProductsList.map((productsListItem: ProductItem) => (
            <li
              key={productsListItem.id}
              className="grid grid-rows-1 grid-cols-4 items-center justify-center select-none"
            >
              <span>Name: {productsListItem.name}</span>
              <span>Amount: {productsListItem.amount}</span>
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
