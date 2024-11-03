import { AuthBody } from '@/entities/Auth/services/authApiService.types';

export interface AuthContextType {
	isAuthorized: boolean;
	isLoading: boolean;
	isSuccessRegistration: boolean;
	isSuccessAuthentication: boolean;
	register: (body: AuthBody) => void;
	toAuthenticate: (body: AuthBody) => void;
	logOut: () => void;
}
