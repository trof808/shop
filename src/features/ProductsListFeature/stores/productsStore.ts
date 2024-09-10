import { APIProcessableError } from '@/shared/errors/api/ApiProcessableError';
import { create } from 'zustand';
import { productsApiService } from '../services/productsApiService';
import { productMapping } from './mapping/productsMapping';
import { ProductType } from '../types';

interface ProductsState {
	products: ProductType[];
	status: 'idle' | 'loading' | 'loaded' | 'error';

	getProductsAction: () => void;
}

export const productsStore = create<ProductsState>(set => ({
	products: [],
	status: 'idle',

	getProductsAction: () => {
		set({ status: 'loading' });
		productsApiService
			.getProducts()
			.then(resp => {
				const mappedProducts = productMapping(resp);

				set({ products: mappedProducts });
			})
			.catch(error => {
				set({ status: 'error' });
				throw new APIProcessableError(error, 'Error fetching products');
			})
			.finally(() => set({ status: 'loaded' }));
	},
}));
