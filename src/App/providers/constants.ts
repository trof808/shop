import { AuthContextType } from './types';

export const defaultAuthContext: AuthContextType = {
	isAuthorized: false,
	isLoading: false,
	isSuccessRegistration: false,
	isSuccessAuthentication: false,
	register: () => {},
	toAuthenticate: () => {},
	logOut: () => {},
};
