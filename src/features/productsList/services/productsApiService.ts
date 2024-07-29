import { ApiService } from '@/shared/api/apiService';
import { Product } from '../types';

const PRODUCTS_URL_API = '';

class ProductsApiService extends ApiService {
	// TODO: mock data
	// лучше описать свой тип для интерфейса Api и не переиспользовать его в приложении
	// Можно сделать рядом файл productsService.types.ts
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
		}));

		// return super.get({ path: 'products' });
	}
}

export const productsApiService = new ProductsApiService(PRODUCTS_URL_API);
