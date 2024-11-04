export interface APIBasket {
	id: number;
	user_id: number;
	created_at: string;
	updated_at: string;
	items: [
		{
			id: number;
			quantity: number;
			created_at: string;
			updated_at: string;
			product: {
				id: number;
				title: string;
				description: string;
				price: number;
				currency: string;
				availableCount: number;
				category_id: number;
				created_at: string;
				updated_at: string;
			};
		},
	];
}
