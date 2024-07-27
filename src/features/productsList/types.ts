export interface Product {
	id: number;
	title: string;
	description: string;
	price: { amount: number; currency: string };
	categoryId: number;
}

export interface SettedProducts extends Product {
	countInBasket: number;
}
