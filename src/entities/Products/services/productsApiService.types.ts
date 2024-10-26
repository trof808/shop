export interface APIProduct {
	page: number;
	products: {
		id: number;
		title: string;
		description: string;
		price: { amount: number; currency: string };
		categoryId: number;
		availableCount: number;
	}[];
	total: number;
}
