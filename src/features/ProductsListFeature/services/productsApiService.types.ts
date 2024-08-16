export interface APIProduct {
	id: number;
	title: string;
	description: string;
	price: { amount: number; currency: string };
	categoryId: number;
	availableCount: number;
}
