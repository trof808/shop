import React from 'react';
import { BasketButtonFeature } from '@/features/BasketButtonFeature/BasketButtonFeature';
import { LinkToFiltersButton } from '@/features/LinkToFiltersButton/LinkToFiltersButton';
import { ProductsListFeature } from '@/features/ProductsListFeature/ProductsListFeature';
import { useData } from '@/entities/Products/hooks/useData';

export default function Products() {
  const { ssrProducts } = useData();

  return (
    <>
      <div className='flex p-4 pt-0 flex-col gap-4'>
        <LinkToFiltersButton />

        <div className='mb-[85px]'>
          <ProductsListFeature ssrProducts={ssrProducts ?? []} />
        </div>
      </div>

      <BasketButtonFeature />
    </>
  );
}
