import { ApiService } from '@/shared/api/apiService';
import { APIProductsFilters } from './productsFiltersApiService.types';

const PRODUCTS_URL_API = '';

class ProductsFiltersApiService extends ApiService {
	// TODO: mock data
	public async getProductsFilters(): Promise<APIProductsFilters[]> {
		return [
			{
				id: 1,
				title: 'Категории',
				properties: [
					{ id: 1, title: 'Электроника', type: 'checkbox' },
					{ id: 2, title: 'Одежда', type: 'checkbox' },
					{ id: 3, title: 'Книги', type: 'checkbox' },
				],
			},
			{
				id: 2,
				title: 'Бренд',
				properties: [
					{ id: 1, title: 'Apple', type: 'checkbox' },
					{ id: 2, title: 'Samsung', type: 'checkbox' },
					{ id: 3, title: 'Nike', type: 'checkbox' },
				],
			},
			{
				id: 3,
				title: 'Цвет',
				properties: [
					{ id: 1, title: 'Красный', type: 'checkbox' },
					{ id: 2, title: 'Синий', type: 'checkbox' },
					{ id: 3, title: 'Зеленый', type: 'checkbox' },
				],
			},
		];

		// return super.get({ path: 'products' });
	}
}

export const productsFiltersApiService = new ProductsFiltersApiService(
	PRODUCTS_URL_API
);
