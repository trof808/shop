import { useMutation } from '@tanstack/react-query';
import { authApiService } from '../services/authApiService';
import { AuthBody } from '../services/authApiService.types';
import { useRouter } from 'next/navigation';
import { PagesRoutes } from '@/shared/constants';
import { cookieExpirationTime, cookieTokenName } from '../constants';
import { useAuthToast } from './useAuthToast';
import { cookieStorageInstance } from '@/entities/BrowserStorage/models/BrowserStorage';
// import { useContext } from 'react';

export const useAuth = () => {
	// return { ...useContext(AuthContext) }
	const {
		authenticationSuccessToast,
		authenticationErrorToast,
		registrationErrorToast,
	} = useAuthToast();
	const router = useRouter();

	const registration = useMutation({
		mutationFn: (body: AuthBody) => authApiService.postRegister(body),
		onSuccess: (_, body) => {
			authentication.mutate(body);
		},
		onError: () => {
			registrationErrorToast();
		},
	});

	const authentication = useMutation({
		mutationFn: (body: AuthBody) => authApiService.postLogIn(body),
		onSuccess: data => {
			cookieStorageInstance.set(cookieTokenName, data.access_token, {
				expires: cookieExpirationTime,
			});
			authenticationSuccessToast();
			router.push(PagesRoutes.HOME);
		},
		onError: () => {
			authenticationErrorToast();
		},
	});

	const isLoading = registration.isPending || authentication.isPending;
	const isSuccessRegistration = registration.isSuccess;
	const isSuccessAuthentication = authentication.isSuccess;
	const register = (body: AuthBody) => registration.mutate(body);
	const toAuthenticate = (body: AuthBody) => authentication.mutate(body);

	return {
		isLoading,
		isSuccessRegistration,
		isSuccessAuthentication,
		register,
		toAuthenticate,
	};
};
