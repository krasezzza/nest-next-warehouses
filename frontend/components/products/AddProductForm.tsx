'use client';

import { createProduct } from '@/api';
import { ProductItem } from '@/interfaces';
import { useState } from 'react';
import ButtonPrimary from '../shared/ButtonPrimary';
import Checkbox from '../shared/Checkbox';
import InputText from '../shared/InputText';

export default function AddProductForm({
  updateRenderKey,
}: {
  updateRenderKey: () => void;
}) {
  const [productName, setProductName] = useState('');
  const [productQuantity, setProductQuantity] = useState(0);
  const [productHazardous, setProductHazardous] = useState(false);

  const handleProductNameInput = (value: string) => {
    setProductName(value);
  };

  const handleProductQuantityInput = (value: string) => {
    let result = Number(value);
    if (isNaN(result)) {
      result = 0;
    }
    setProductQuantity(result);
  };

  const handleProductSubmit = () => {
    if (!productName.length || !productQuantity) {
      return;
    }

    const newProduct: Partial<ProductItem> = {
      name: productName,
      isHazardous: productHazardous,
      quantity: productQuantity,
    };

    createProduct(newProduct).then((res) => {
      if (res.data) {
        handleResetFields();
        updateRenderKey();
      }
    });
  };

  const handleResetFields = () => {
    setProductName('');
    setProductQuantity(0);
    setProductHazardous(false);
  };

  return (
    <div className="w-[50%] grid grid-rows-2 grid-cols-2 gap-[18px]">
      <div className="flex gap-x-[12px] items-center justify-start">
        <label className="text-sm">Name:</label>
        <InputText
          value={productName}
          placeholder="Product Name"
          onChangeHandler={handleProductNameInput}
        />
      </div>

      <div className="flex gap-x-[12px] items-center justify-end">
        <label className="text-sm">Quantity:</label>
        <InputText
          value={productQuantity.toString()}
          placeholder="Product Quantity"
          onChangeHandler={handleProductQuantityInput}
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

      <div className="flex items-center justify-end">
        <ButtonPrimary
          label="Add Product"
          onClickHandler={handleProductSubmit}
          additionalButtonClasses="w-[180px]"
        />
      </div>
    </div>
  );
}
