import { ApiService } from '@/shared/api/apiService';
import { Product } from '../types';

const PRODUCTS_URL_API = '';

class ProductsApiService extends ApiService {
	// TODO: mock data
	public async getProducts(): Promise<Product[]> {
		return Array.from({ length: 1000 }, (_, index) => ({
			id: index,
			title: `Product ${index}`,
			description: `Description for product ${index}`,
			price: {
				amount: parseFloat((Math.random() * 100).toFixed(2)),
				currency: 'USD',
			},
			categoryId: Math.floor(Math.random() * 10),
			availableCount: Math.floor(Math.random() * 100),
			properties: [{ title: 'Property 1', value: 'Value 1' }],
		}));

		// return super.get({ path: 'products' });
	}
}

export const productsApiService = new ProductsApiService(PRODUCTS_URL_API);
