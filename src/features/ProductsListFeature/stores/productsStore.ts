import { APIProcessableError } from '@/shared/errors/api/ApiProcessableError';
import { create } from 'zustand';
import { productsApiService } from '../services/productsApiService';
import { Product } from '../types';
import { productMapping } from './mapping/productsMapping';

interface ProductsState {
	products: Product[];
	isLoading: boolean;

	getProductsAction: () => void;
}

export const productsStore = create<ProductsState>(set => ({
	products: [],
	isLoading: false,
	selectedProductsIds: {},
	selectedTotalPrice: 0,

	getProductsAction: () => {
		set({ isLoading: true });
		productsApiService
			.getProducts()
			.then(resp => {
				set({ products: productMapping(resp) });
			})
			.catch(error => {
				throw new APIProcessableError(error, 'Error fetching products');
			})
			.finally(() => set({ isLoading: false }));
	},
}));
