import { ApiService } from '@/shared/api/apiService';
import { AuthToken, AuthBody } from './authApiService.types';

class AuthApiService extends ApiService {
	public async postRegister(authBody: AuthBody) {
		const body = {
			...authBody,
			role: 'client',
		};

		return super.create({ path: 'auth/register', body });
	}

	public async postLogIn(authBody: AuthBody): Promise<AuthToken> {
		return super.create<AuthToken, AuthBody>({
			path: 'auth/login',
			body: authBody,
		});
	}
}

export const authApiService = new AuthApiService();
