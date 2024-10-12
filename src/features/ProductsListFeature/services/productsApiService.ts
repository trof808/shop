import { ApiService } from '@/shared/api/apiService';
import { APIProduct } from './productsApiService.types';

class ProductsApiService extends ApiService {
	public async getProducts(page: number, limit: number): Promise<APIProduct> {
		// mock data
		// return Array.from({ length: 1000 }, (_, index) => ({
		// 	id: index + 1,
		// 	title: `Product ${index + 1}`,
		// 	description: `Description for product ${index + 1}`,
		// 	price: {
		// 		amount:
		// 			index % 2 !== 0
		// 				? parseFloat((index + 1 + (Math.random() * 0.09 + 0.1)).toFixed(2))
		// 				: index + 1,
		// 		currency: 'USD',
		// 	},
		// 	categoryId: ((index + 1) % 10) + 1,
		// 	availableCount: (index % 6) + 1,
		// }));

		return super.get<APIProduct>({
			path: `products/search?limit=${limit}&page=${page}`,
		});
	}
}

export const productsApiService = new ProductsApiService();
