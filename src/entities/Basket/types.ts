import { PriceType } from '@/shared/types/price';
import { CategoryId, ProductId } from '@/shared/types/product';

export interface IBasketProduct {
	id: ProductId;
	title: string;
	description: string;
	price: PriceType;
	categoryId: CategoryId;
	availableCount: number;
}
