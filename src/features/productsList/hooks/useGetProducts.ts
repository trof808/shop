import { useEffect, useState } from 'react';
import { useProductsStore } from '../stores/productsStore';
import { SettedProducts } from '../types';

export const useGetProducts = () => {
	const isLoading = useProductsStore(state => state.isLoading);
	const productsList = useProductsStore(state => state.products);
	const selectedProductsIds = useProductsStore(
		state => state.selectedProductsIds
	);
	const totalPrice = useProductsStore(state => state.selectedTotalPrice);

	const getProductsAction = useProductsStore(state => state.getProductsAction);
	const addToBasketAction = useProductsStore(state => state.addToBasketAction);
	const removeFromBasketAction = useProductsStore(
		state => state.removeFromBasketAction
	);

	const [products, setProducts] = useState<SettedProducts[]>([]);

	useEffect(() => {
		getProductsAction();
	}, [getProductsAction]);

	useEffect(() => {
		if (productsList.length) {
			const settedList = productsList.map(item => ({
				...item,
				countInBasket: selectedProductsIds[item.id] || 0,
			}));
			setProducts(settedList);
		}
	}, [selectedProductsIds, productsList]);

	return {
		products,
		isLoading,
		totalPrice,
		addToBasketAction,
		removeFromBasketAction,
	};
};
