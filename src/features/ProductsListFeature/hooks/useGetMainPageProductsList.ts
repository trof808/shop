import { useCallback, useMemo } from 'react';
import { useGetBasketManager } from '@/entities/Basket/hooks/useGetBasketManager';
import { useGetProducts } from '@/entities/Products/hooks/useGetProducts';
import {
  ProductId,
  ProductItemDataView,
  ProductType,
} from '@/entities/Products/types';

interface Props {
  ssrProducts: ProductType[];
}

export const useGetMainPageProductsList = ({ ssrProducts }: Props) => {
  const { basketManager } = useGetBasketManager();
  const { productsList, status, fetchNextPage, hasNextPage } = useGetProducts({
    ssrProducts,
  });

  const products: ProductItemDataView[] = useMemo(() => {
    if (productsList.length) {
      return productsList.map(item => ({
        description: item.description,
        title: item.title,
        price: item.price,
        id: item.id,
        countInBasket: basketManager.basket.getProductCountById(item.id),
      }));
    }

    return [];
  }, [productsList, basketManager]);

  const findProductById = useCallback(
    (id: ProductId) => {
      return productsList.find(p => p.id === id);
    },
    [productsList]
  );

  const handleAddToBasket = useCallback(
    (id: ProductId) => {
      const product = findProductById(id);
      if (!!product) basketManager.handleAddItemToBasket(product);
    },
    [basketManager, findProductById]
  );

  const handleRemoveFromBasket = useCallback(
    (id: ProductId) => {
      const product = findProductById(id);
      if (!!product) basketManager.handleRemoveItemFromBasket(product);
    },
    [basketManager, findProductById]
  );

  return {
    products,
    status,
    canAdd: basketManager.basket.canAdd,
    canRemove: basketManager.basket.canRemove,
    handleRemoveFromBasket,
    handleAddToBasket,
    fetchNextPage,
    hasNextPage,
  };
};
