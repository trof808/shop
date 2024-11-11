import { ApiService } from '@/shared/api/apiService';
import { APIBasket } from './basketApiService.types';
import { BodyCartProductAPI } from '../types';
import { cookieStorageInstance } from '@/shared/entities/BrowserStorage/models/BrowserStorage';

class BasketApiService extends ApiService {
	public async getCart(): Promise<APIBasket> {
		return super.get<APIBasket>({
			path: 'cart',
		});
	}

	public async postCart(body: BodyCartProductAPI): Promise<string> {
		return super.create<string>({
			path: 'cart/save',
			body,
		});
	}

	public async deleteCart(): Promise<string> {
		return super.delete<string>({
			path: 'cart/clear',
		});
	}
}

export const basketApiService = new BasketApiService({
	browserStorage: cookieStorageInstance,
});
