import { PriceType } from '@/shared/types/price';
import { CategoryId, ProductId } from '../Products/types';
import { Basket } from './models/Basket';

export type TokenType = string | null;

export interface BasketConstructorParams {
	isAuthorized: boolean;
	updateStore: (basket: IBasket) => void;
	notify: (message: string) => void;
	defaultBasketState: IBasket;
	updateBrowserStorage: (basket: Basket) => void;
	getBrowserStorage: () => string | null;
	getBasketFromServer: () => Promise<IBasket>;
	deleteBrowserStorage: () => void;
	updateServerStorage: (basket: BodyCartProduct[]) => void;
	deleteServerStorage: () => void;
}

export interface IBasketProduct {
	id: ProductId;
	title: string;
	description: string;
	price: PriceType;
	categoryId: CategoryId;
	availableCount: number;
}

export interface IBasket {
	products: IBasketProduct[];
	productsCount: Record<string, number>;
}

export interface BodyCartProduct {
	productId: number;
	quantity: number;
}

export interface BodyCartProductAPI {
	items: BodyCartProduct[];
}
