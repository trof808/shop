type FilterId = string;
type PropertyId = number;

export interface ProductsFilters {
	id: FilterId;
	title: string;
	properties: {
		id: PropertyId;
		title: string;
		type: string;
	}[];
}
