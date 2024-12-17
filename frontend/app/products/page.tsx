'use client';

import { useMainContext } from '@/context/MainContext'
import InputText from '@/components/InputText';
import { useState } from 'react';
import { ProductItem } from '@/interfaces';
import ButtonSecondary from '@/components/ButtonSecondary';
import ButtonPrimary from '@/components/ButtonPrimary';
import ButtonLink from '@/components/ButtonLink';

export default function Products() {
  const [productId, setProductId] = useState('');
  const [productName, setProductName] = useState('');
  const [productAmount, setProductAmount] = useState(0);

  const { masterProductsList, setMasterProductsList } = useMainContext();

  const handleResetFields = () => {
    setProductId('');
    setProductName('');
    setProductAmount(0);
  };
  const handleProductIdInput = (value: string) => {
    setProductId(value);
  };
  const handleProductNameInput = (value: string) => {
    setProductName(value);
  };
  const handleProductAmountInput = (value: string) => {
    setProductAmount(Number(value));
  };
  const handleProductSubmit = () => {
    if (!productId.length || !productName.length || !productAmount) {
      return;
    }

    const newProduct: ProductItem = {
      id: productId,
      name: productName,
      amount: productAmount,
    };

    handleResetFields();
    setMasterProductsList([...masterProductsList, newProduct]);
  };
  const handleProductRemove = (productItem: ProductItem) => {
    const filteredProductsList = masterProductsList.filter((item) => item.id !== productItem.id);

    setMasterProductsList(filteredProductsList);
  };

  return (
    <div className='p-[24px] flex flex-col gap-y-[24px]'>
      <ButtonLink route={'/'} label="Home Page" />

      <div className='flex items-center justify-between'>
        <InputText value={productId} placeholder='Product ID' onChangeHandler={handleProductIdInput} />
        <InputText value={productName} placeholder='Product Name' onChangeHandler={handleProductNameInput} />
        <InputText value={productAmount.toString()} placeholder='Product Amount' onChangeHandler={handleProductAmountInput} />
        <ButtonPrimary label="Submit" onClickHandler={handleProductSubmit} />
      </div>

      {masterProductsList.length > 0 ? (
        <ul className='px-[24px] py-[12px] flex flex-col gap-y-[6px] rounded border border-solid border-white list-decimal'>
          {masterProductsList.map((productsListItem) => (
            <li key={productsListItem.id} className='flex items-center justify-between'>
              <span>Name: {productsListItem.name}</span>
              <span>Amount: {productsListItem.amount}</span>
              <ButtonSecondary label='Remove' onClickHandler={() => { handleProductRemove(productsListItem) }} />
            </li>
          ))}
        </ul>
      ) : (
        <div className='flex items-center justify-center'>No products available</div>
      )}
    </div>
  )
}
