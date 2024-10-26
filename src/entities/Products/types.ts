import { PriceType } from '@/shared/types/price';

export type ProductId = number;
export type CategoryId = number;

export interface ProductType {
	id: ProductId;
	title: string;
	description: string;
	price: PriceType;
	categoryId: CategoryId;
	availableCount: number;
}

export type ProductItemDataView = Pick<
	ProductType,
	'description' | 'id' | 'price' | 'title'
> & {
	countInBasket: number;
};

export type ProductItemActions = {
	addToBasket: (id: ProductId) => void;
	removeFromBasket: (id: ProductId) => void;
	canAdd: (id: ProductId) => boolean;
	canRemove: (id: ProductId) => boolean;
};

export type ProductLoadActions = {
	fetchNextPage: () => void;
	hasNextPage: boolean;
};
