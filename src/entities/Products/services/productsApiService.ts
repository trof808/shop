import { ApiService } from '@/shared/api/apiService';
import { APIProduct } from './productsApiService.types';

class ProductsApiService extends ApiService {
	public async getProducts(page: number, limit: number): Promise<APIProduct> {
		return super.get<APIProduct>({
			path: `products/search?limit=${limit}&page=${page}`,
		});
	}
}

export const productsApiService = new ProductsApiService();
