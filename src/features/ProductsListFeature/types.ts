type ProductId = number;
type CategoryId = number;

export interface ProductType {
	id: ProductId;
	title: string;
	description: string;
	price: { amount: number; currency: string };
	categoryId: CategoryId;
	availableCount: number;
}

export interface SettedProductsType extends ProductType {
	countInBasket: number;
	addToBasketAction: () => void;
	removeFromBasketAction: () => void;
	isCanIncrement: boolean;
}
