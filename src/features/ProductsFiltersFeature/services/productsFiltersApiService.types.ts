export interface APIProductsFilters {
	id: string;
	title: string;
	properties: {
		id: number;
		title: string;
		type: 'checkbox' | 'range';
	}[];
}
