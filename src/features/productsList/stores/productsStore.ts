import { APIProcessableError } from '@/shared/errors/api/ApiProcessableError';
import { create } from 'zustand';
import { productsApiService } from '../services/productsApiService';
import { Product } from '../types';

interface ProductsState {
	products: Product[];
	isLoading: boolean;
	getProductsAction: () => void;
}

export const useProductsStore = create<ProductsState>(set => ({
	products: [],
	isLoading: false,

	getProductsAction: () => {
		set({ isLoading: true });
		productsApiService
			.getProducts()
			.then(resp => {
				set({ products: resp });
			})
			.catch(error => {
				throw new APIProcessableError(error, 'Error fetching products');
			})
			.finally(() => set({ isLoading: false }));
	},
}));
