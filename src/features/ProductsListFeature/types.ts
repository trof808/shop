import { PriceType } from '@/shared/types/price';
import { ProductId, CategoryId } from '@/shared/types/product';

export interface ProductType {
	id: ProductId;
	title: string;
	description: string;
	price: PriceType;
	categoryId: CategoryId;
	availableCount: number;
}

export interface SettedProductsType extends ProductType {
	addToBasketAction: () => void;
	removeFromBasketAction: () => void;
}
