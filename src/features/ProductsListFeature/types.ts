type ProductId = number;
type CategoryId = number;

export interface Product {
	id: ProductId;
	title: string;
	description: string;
	price: { amount: number; currency: string };
	categoryId: CategoryId;
}

export interface SettedProducts extends Product {
	countInBasket: number;
}
