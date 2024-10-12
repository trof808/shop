import { productsStore } from '../stores/productsStore';

export const useFetchProductsNextPage = () => {
	const limit = productsStore(state => state.limit);
	const page = productsStore(state => state.page);
	const totalCount = productsStore(state => state.totalCount);
	const getProductsNextPageAction = productsStore(
		state => state.getProductsNextPageAction
	);

	const fetchProductsNextPage = () => {
		const hasMoreProducts = limit * page < totalCount;

		return hasMoreProducts ? getProductsNextPageAction() : undefined;
	};

	return { fetchProductsNextPage };
};
