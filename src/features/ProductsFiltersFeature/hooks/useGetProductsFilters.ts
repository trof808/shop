import { useEffect } from 'react';
import { productsFiltersStore } from '../stores/productsFiltersStore';
import { UrlFilterManager } from '@/entities/URlFilter/UrlFilterManager';

export const useGetProductsFilters = () => {
	const isLoading = productsFiltersStore(state => state.isLoading);
	const filters = productsFiltersStore(state => state.filters);
	const updateFiltersToStore = productsFiltersStore(
		state => state.updateFilters
	);
	const getCategoriesAction = productsFiltersStore(
		state => state.getCategoriesAction
	);

	const updateUrl = (queryParamsString: string) => {
		window.history.pushState(null, '', queryParamsString);
	};

	const urlFilterManager = new UrlFilterManager(
		updateFiltersToStore,
		updateUrl,
		filters
	);
	urlFilterManager.restoreFiltersFromUrl();

	useEffect(() => {
		getCategoriesAction();
	}, [getCategoriesAction]);

	return {
		filters,
		isLoading,
		urlFilterManager,
	};
};
