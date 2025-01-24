'use client';

import React from 'react';
import { ProductType } from '@/entities/Products/types';
import { ProductsVirtualList } from './ProductsVirtualList';
import { useGetMainPageProductsList } from './hooks/useGetMainPageProductsList';

interface Props {
  ssrProducts: ProductType[];
}

export const ProductsListFeature = ({ ssrProducts }: Props) => {
  const {
    products,
    status,
    canAdd,
    canRemove,
    handleAddToBasket,
    handleRemoveFromBasket,
    fetchNextPage,
    hasNextPage,
  } = useGetMainPageProductsList({ ssrProducts });

  if (status === 'pending') {
    return 'loading...';
  }

  return (
    <ProductsVirtualList
      products={products}
      canAdd={canAdd}
      canRemove={canRemove}
      addToBasket={handleAddToBasket}
      removeFromBasket={handleRemoveFromBasket}
      fetchNextPage={fetchNextPage}
      hasNextPage={hasNextPage}
    />
  );
};
