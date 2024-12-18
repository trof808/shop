import { PriceType } from '@/shared/types/price';
import { CategoryId, ProductId } from '../Products/types';
import { Basket } from './models/Basket';
import { BrowserStorage } from '@/shared/entities/BrowserStorage/types';

export interface BasketConstructorParams {
	isAuthorized: boolean;
	basket: Basket;
	updateStore: (basket: IBasket) => void;
	notify: (message: string) => void;
	browserStorage: BrowserStorage;
	getBasketFromServer: () => Promise<IBasket>;
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
