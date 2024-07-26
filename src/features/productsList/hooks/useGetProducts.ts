import { useEffect } from 'react';
import { useProductsStore } from '../stores/productsStore';

export const useGetProducts = () => {
	const getProductsAction = useProductsStore(state => state.getProductsAction);
	const isLoading = useProductsStore(state => state.isLoading);
	const productsList = useProductsStore(state => state.products);

	useEffect(() => {
		getProductsAction();
	}, [getProductsAction]);

	return { products: productsList, isLoading };
};
