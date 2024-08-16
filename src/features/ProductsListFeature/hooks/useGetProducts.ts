import { useEffect, useMemo } from 'react';
import { productsStore } from '../stores/productsStore';
import { ProductManager } from '@/entities/Product/ProductManager';
import { SettedProductsType } from '../types';

export const useGetProducts = () => {
	const isLoading = productsStore(state => state.isLoading);
	const productsList = productsStore(state => state.products);

	const getProductsAction = productsStore(state => state.getProductsAction);
	const updateBasket = productsStore(state => state.updateBasket);

	const basketManager = new ProductManager(productsList, updateBasket);

	useEffect(() => {
		getProductsAction();
	}, [getProductsAction]);

	const products: SettedProductsType[] = useMemo(() => {
		if (productsList.length) {
			return productsList.map(item => ({
				...item.product,
				countInBasket: item.selectedCount,
				isCanIncrement: item.isCanIncrement,
				addToBasketAction: () => basketManager.addToBasket(item),
				removeFromBasketAction: () => basketManager.removeFromBasket(item),
			}));
		}

		return [];
	}, [productsList]);

	return {
		products,
		isLoading,
		totalPrice: basketManager.totalPriceInBasket,
	};
};
