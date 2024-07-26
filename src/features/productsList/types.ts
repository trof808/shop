export interface Product {
	id: number;
	title: string;
	description: string;
	price: { amount: number; currency: string };
	categoryId: number;
	availableCount: number;
	properties: { title: string; value: string }[];
}
