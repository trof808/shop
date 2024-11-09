import { ApiService } from '@/shared/api/apiService';
import { APIBasket } from './basketApiService.types';
import { BodyCartProduct, BodyCartProductAPI, TokenType } from '../types';

class BasketApiService extends ApiService {
	public async getCart(token: TokenType): Promise<APIBasket> {
		const headers = {
			Authorization: 'Bearer ' + token,
		};

		return super.get<APIBasket>({
			path: 'cart',
			headers,
		});
	}

	public async postCart(
		body: BodyCartProductAPI,
		token: TokenType
	): Promise<string> {
		// Перенести в ApiService
		const headers = {
			Authorization: 'Bearer ' + token,
		};

		return super.create<string>({
			path: 'cart/save',
			body,
			headers,
		});
	}

	public async deleteCart(token: TokenType): Promise<string> {
		const headers = {
			Authorization: 'Bearer ' + token,
		};

		return super.delete<string>({
			path: 'cart/clear',
			headers,
		});
	}
}

// передавать авторизацию через конструктор, и подставлять токен внутри ApiService
// export const basketApiService = new BasketApiService({ withAuth: true });
export const basketApiService = new BasketApiService();
