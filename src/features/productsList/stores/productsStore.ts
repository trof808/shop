import { APIProcessableError } from '@/shared/errors/api/ApiProcessableError';
import { create } from 'zustand';
import { productsApiService } from '../services/productsApiService';
import { Product } from '../types';
import { productStoreMapping } from './mapping/productsMapping';

interface ProductsState {
	products: Product[];
	isLoading: boolean;
	selectedProductsIds: { [id: number]: number };
	selectedTotalPrice: number;

	getProductsAction: () => void;
	addToBasketAction: (id: number) => void;
	removeFromBasketAction: (id: number) => void;
}

export const useProductsStore = create<ProductsState>(set => ({
	products: [],
	isLoading: false,
	selectedProductsIds: {},
	selectedTotalPrice: 0,

	addToBasketAction: (id: number) => {
		set(state => {
			const product = state.products.find(product => product.id === id);
			if (!product) {
				return state;
			}

			const newTotalPrice = state.selectedTotalPrice + product.price.amount;
			const newSelectedIds = {
				...state.selectedProductsIds,
				[product.id]: (state.selectedProductsIds[product.id] || 0) + 1,
			};

			return {
				selectedTotalPrice: newTotalPrice,
				selectedProductsIds: newSelectedIds,
			};
		});
	},

	removeFromBasketAction: (id: number) => {
		set(state => {
			const product = state.products.find(product => product.id === id);
			if (!product) {
				return state;
			}

			const newTotalPrice = state.selectedTotalPrice - product.price.amount;
			const newSelectedIds = {
				...state.selectedProductsIds,
				[product.id]: (state.selectedProductsIds[product.id] || 0) - 1,
			};

			return {
				selectedTotalPrice: newTotalPrice,
				selectedProductsIds: newSelectedIds,
			};
		});
	},

	getProductsAction: () => {
		set({ isLoading: true });
		productsApiService
			.getProducts()
			.then(resp => {
				set({ products: productStoreMapping(resp) });
			})
			.catch(error => {
				throw new APIProcessableError(error, 'Error fetching products');
			})
			.finally(() => set({ isLoading: false }));
	},
}));
