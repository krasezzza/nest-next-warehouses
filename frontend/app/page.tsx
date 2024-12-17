'use client';

import ButtonLink from '@/components/ButtonLink';

export default function Home() {
  return (
    <div className="py-[30%] flex items-center justify-center gap-x-[24px]">
      <ButtonLink route={'/products'} label="Product Entry" />
      <ButtonLink route={'/warehouses'} label="Stock Management" />
    </div>
  );
}
