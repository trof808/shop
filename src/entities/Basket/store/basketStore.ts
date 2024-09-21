import { create } from 'zustand';
import { IBasket } from '../types';

interface BasketActions {
	updateBasketState: (basketState: BasketState) => void;
	getBasketState: () => IBasket;
}

interface BasketState extends IBasket {}

export const basketStore = create<BasketState & BasketActions>((set, get) => ({
	products: [],
	productsCount: {},

	updateBasketState: (basketState: IBasket) => {
		set(basketState);
	},

	getBasketState: () => {
		return {
			products: get().products,
			productsCount: get().productsCount
		}
	}
}));
