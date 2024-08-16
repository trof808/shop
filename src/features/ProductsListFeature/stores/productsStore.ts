import { APIProcessableError } from '@/shared/errors/api/ApiProcessableError';
import { create } from 'zustand';
import { productsApiService } from '../services/productsApiService';
import { productMapping } from './mapping/productsMapping';
import { Product } from '@/entities/Product/Product';

interface ProductsState {
	products: Product[];
	isLoading: boolean;

	updateBasket: (product: Product[]) => void;
	getProductsAction: () => void;
}

export const productsStore = create<ProductsState>(set => ({
	products: [],
	isLoading: false,
	selectedProductsIds: {},
	selectedTotalPrice: 0,

	updateBasket: (basket: Product[]) => {
		set({ products: [...basket] });
	},

	getProductsAction: () => {
		set({ isLoading: true });
		productsApiService
			.getProducts()
			.then(resp => {
				const mappedProducts = productMapping(resp);

				const products = mappedProducts.map(item => new Product(item));

				set({ products });
			})
			.catch(error => {
				throw new APIProcessableError(error, 'Error fetching products');
			})
			.finally(() => set({ isLoading: false }));
	},
}));
