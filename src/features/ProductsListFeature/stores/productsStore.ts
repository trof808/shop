import { APIProcessableError } from '@/shared/errors/api/ApiProcessableError';
import { create } from 'zustand';
import { productsApiService } from '../services/productsApiService';
import { productMapping } from './mapping/productsMapping';
import { Product } from '@/entities/Product/Product';

interface ProductsState {
	products: Product[];
	status: 'idle' | 'loading' | 'loaded' | 'error';

	updateBasket: (product: Product[]) => void;
	getProductsAction: () => void;
}

export const productsStore = create<ProductsState>(set => ({
	products: [],
	status: 'idle',
	selectedProductsIds: {},
	selectedTotalPrice: 0,

	updateBasket: (basket: Product[]) => {
		set({ products: [...basket] });
	},

	getProductsAction: () => {
		set({ status: 'loading' });
		productsApiService
			.getProducts()
			.then(resp => {
				const mappedProducts = productMapping(resp);

				const products = mappedProducts.map(item => new Product(item));

				set({ products });
			})
			.catch(error => {
				set({ status: 'error' });
				throw new APIProcessableError(error, 'Error fetching products');
			})
			.finally(() => set({ status: 'loaded' }));
	},
}));
