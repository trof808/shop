import { useEffect, useMemo } from 'react';
import { productsStore } from '../stores/productsStore';
import { ProductManager } from '@/entities/Product/ProductManager';
import { SettedProductsType } from '../types';

export const useGetProducts = () => {
	const status = productsStore(state => state.status);
	const productsList = productsStore(state => state.products);

	const getProductsAction = productsStore(state => state.getProductsAction);
	const updateBasket = productsStore(state => state.updateBasket);

	const productManager = new ProductManager(productsList, updateBasket);

	useEffect(() => {
		getProductsAction();
	}, []);

	useEffect(() => {
		if (status === 'loaded') {
			productManager.setFromLocalStorage();
		}
	}, [status]);

	const products: SettedProductsType[] = useMemo(() => {
		if (productsList.length) {
			return productsList.map(item => ({
				...item.product,
				countInBasket: item.selectedCount,
				isCanIncrement: item.isCanIncrement,
				addToBasketAction: () => productManager.addToBasket(item),
				removeFromBasketAction: () => productManager.removeFromBasket(item),
			}));
		}

		return [];
	}, [productsList]);

	return {
		products,
		status,
		totalPrice: productManager.totalPriceInBasket,
	};
};
