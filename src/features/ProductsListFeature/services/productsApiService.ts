import { ApiService } from '@/shared/api/apiService';
import { APIProduct } from './productsApiService.types';

const PRODUCTS_URL_API = '';

class ProductsApiService extends ApiService {
	// TODO: mock data
	public async getProducts(): Promise<APIProduct[]> {
		return Array.from({ length: 1000 }, (_, index) => ({
			id: index,
			title: `Product ${index}`,
			description: `Description for product ${index}`,
			price: {
				amount: index * 0.1,
				currency: 'USD',
			},
			categoryId: (index % 10) + 1,
			availableCount: (index % 6) + 1,
		}));

		// return super.get({ path: 'products' });
	}
}

export const productsApiService = new ProductsApiService(PRODUCTS_URL_API);
