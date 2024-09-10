import { useEffect, useMemo } from 'react';
import { productsStore } from '../stores/productsStore';
import { SettedProductsType } from '../types';
import { BasketManager } from '@/entities/Basket/BasketManager';
import { basketStore } from '@/features/BasketListFeature/stores/basketStore';

export const useGetProducts = () => {
	const status = productsStore(state => state.status);
	const productsList = productsStore(state => state.products);

	const getProductsAction = productsStore(state => state.getProductsAction);
	const updateProductsInBasket = basketStore(
		state => state.updateProductsInBasket
	);

	const basketManager = new BasketManager(updateProductsInBasket);

	useEffect(() => {
		getProductsAction();
	}, []);

	const products: SettedProductsType[] = useMemo(() => {
		if (productsList.length) {
			return productsList.map(item => ({
				...item,
				addToBasketAction: () => basketManager.handleAddItemToBasket(item),
				removeFromBasketAction: () =>
					basketManager.handleRemoveItemFromBasket(item),
			}));
		}

		return [];
	}, [productsList]);

	return {
		products,
		status,
	};
};
