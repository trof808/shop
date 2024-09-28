import { ApiService } from '@/shared/api/apiService';
import { APIProduct } from './productsApiService.types';

const PRODUCTS_URL_API = '';

class ProductsApiService extends ApiService {
	// TODO: mock data
	public async getProducts(): Promise<APIProduct[]> {
		return Array.from({ length: 1000 }, (_, index) => ({
			id: index + 1,
			title: `Product ${index + 1}`,
			description: `Description for product ${index + 1}`,
			price: {
				amount: parseFloat(
					(index + 1 + (Math.random() * 0.09 + 0.1)).toFixed(2)
				),
				currency: 'USD',
			},
			categoryId: ((index + 1) % 10) + 1,
			availableCount: ((index + 1) % 6) + 1,
		}));

		// return super.get({ path: 'products' });
	}
}

export const productsApiService = new ProductsApiService(PRODUCTS_URL_API);
