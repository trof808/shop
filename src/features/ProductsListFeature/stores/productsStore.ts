import { APIProcessableError } from '@/shared/errors/api/ApiProcessableError';
import { create } from 'zustand';
import { productsApiService } from '../services/productsApiService';
import { productMapping } from './mapping/productsMapping';
import { ProductType } from '../types';
import { ProductId } from '@/shared/types/product';

interface ProductsState {
	products: ProductType[];
	status: 'idle' | 'loading' | 'loaded' | 'error';

	getProductsAction: () => void;
	findById: (id: ProductId) => ProductType | undefined;
}

export const productsStore = create<ProductsState>((set, get) => ({
	products: [],
	status: 'idle',

	findById: (id: ProductId) => {
		return get().products.find(p => p.id === id);
	},

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
