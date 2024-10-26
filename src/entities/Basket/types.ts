import { PriceType } from '@/shared/types/price';
import { CategoryId, ProductId } from '../Products/types';

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
