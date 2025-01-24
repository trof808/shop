'use client';

import React, { createContext, useEffect } from 'react';
import { useGetBasketManager } from '@/entities/Basket/hooks/useGetBasketManager';
import { useAuth } from '@/entities/Auth/hooks/useAuth';
import { ProductType } from '@/entities/Products/types';

export const DataContext = createContext<{ ssrProducts: ProductType[] }>({
  ssrProducts: [],
});

interface Props {
  children: React.ReactNode;
  ssrProducts: ProductType[];
}

export const DataProvider = ({ children, ssrProducts }: Props) => {
  const { isAuthorized } = useAuth();
  const { basketManager } = useGetBasketManager();

  useEffect(() => {
    basketManager.restoreBasket();
  }, [isAuthorized]);

  return (
    <DataContext.Provider value={{ ssrProducts } ?? []}>
      {children}
    </DataContext.Provider>
  );
};
