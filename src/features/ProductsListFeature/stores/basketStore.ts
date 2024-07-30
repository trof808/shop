import { create } from 'zustand';
import { Product } from '../types';

interface BasketState {
	selectedProductsIds: { [id: number]: number };
	selectedTotalPrice: number;

	addToBasketAction: (product: Product) => void;
	removeFromBasketAction: (product: Product) => void;
}

export const basketStore = create<BasketState>(set => ({
	selectedProductsIds: {},
	selectedTotalPrice: 0,

	addToBasketAction: (product: Product) => {
		set(state => {
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

	removeFromBasketAction: (product: Product) => {
		set(state => {
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
}));
