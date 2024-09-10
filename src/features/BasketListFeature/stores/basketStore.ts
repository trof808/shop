import { Basket } from '@/entities/Basket/Basket';
import { ProductType } from '@/features/ProductsListFeature/types';
import { create } from 'zustand';

interface BasketState {
	productsInBasket: ProductType[];
	productsIdCountInBasket: Record<string, number>;

	updateProductsInBasket: (basket: Basket) => void;
	getCountProductInBasket: (product: ProductType) => number;
	isCanAddItemToBasket: (product: ProductType) => boolean;
	getTotalPriceInBasket: () => number;
}

export const basketStore = create<BasketState>((set, get) => ({
	productsInBasket: [],
	productsIdCountInBasket: {},

	updateProductsInBasket: (basket: Basket) => {
		set({
			productsInBasket: [...basket.products],
			productsIdCountInBasket: { ...basket.productsCount },
		});
	},

	getCountProductInBasket: (product: ProductType) => {
		return get().productsIdCountInBasket[product.id] ?? 0;
	},

	isCanAddItemToBasket: (product: ProductType) => {
		const currentCount = get().productsIdCountInBasket[product.id] ?? 0;

		if (!currentCount) {
			return true;
		}

		return get().productsIdCountInBasket[product.id] < product.availableCount;
	},

	getTotalPriceInBasket: () => {
		return get().productsInBasket.reduce((total, product) => {
			return (
				total + product.price.amount * get().productsIdCountInBasket[product.id]
			);
		}, 0);
	},
}));
