import { useEffect, useMemo } from 'react';
import { productsStore } from '../stores/productsStore';
import { basketStore } from '../stores/basketStore';

export const useGetProducts = () => {
	const isLoading = productsStore(state => state.isLoading);
	const productsList = productsStore(state => state.products);
	const selectedProductsIds = basketStore(state => state.selectedProductsIds);
	const totalPrice = basketStore(state => state.selectedTotalPrice);

	const getProductsAction = productsStore(state => state.getProductsAction);
	const addToBasketAction = basketStore(state => state.addToBasketAction);
	const removeFromBasketAction = basketStore(
		state => state.removeFromBasketAction
	);

	useEffect(() => {
		getProductsAction();
	}, [getProductsAction]);

	const products = useMemo(() => {
		if (productsList.length) {
			return productsList.map(item => ({
				...item,
				countInBasket: selectedProductsIds[item.id] || 0,
			}));
		}

		return [];
	}, [selectedProductsIds, productsList]);

	return {
		products,
		isLoading,
		totalPrice,
		addToBasketAction,
		removeFromBasketAction,
	};
};
