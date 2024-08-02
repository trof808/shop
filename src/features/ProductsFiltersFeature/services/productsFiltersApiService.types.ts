export interface APIProductsFilters {
	id: number;
	title: string;
	properties: {
		id: number;
		title: string;
		type: 'checkbox' | 'range';
	}[];
}
