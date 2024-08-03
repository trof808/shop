import { APIProcessableError } from '@/shared/errors/api/ApiProcessableError';
import { create } from 'zustand';
import { productsFiltersApiService } from '../services/productsFiltersApiService';
import { ProductsFilters } from '../types';
import { productsFiltersMapping } from './mapping/productsFiltersMapping';

interface ProductsFiltersState {
	filters: ProductsFilters[];
	selectedFilters: Record<string, number[]>;
	isLoading: boolean;

	saveFiltersToStore: (filters: Record<string, number[]>) => void;
	getCategoriesAction: () => void;
}

export const productsFiltersStore = create<ProductsFiltersState>(set => ({
	filters: [],
	selectedFilters: {},
	isLoading: false,

	saveFiltersToStore: (filters: Record<string, number[]>) => {
		set({ selectedFilters: filters });
	},

	getCategoriesAction: () => {
		set({ isLoading: true });
		productsFiltersApiService
			.getProductsFilters()
			.then(resp => {
				set({ filters: productsFiltersMapping(resp) });
			})
			.catch(error => {
				throw new APIProcessableError(error, 'Error fetching categories');
			})
			.finally(() => set({ isLoading: false }));
	},
}));
