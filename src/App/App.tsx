'use client';

import React, { useEffect, createContext } from 'react';
import { useGetBasketManager } from '@/entities/Basket/hooks/useGetBasketManager';
import { Toaster } from '@/shared/components/ui/shadcn/toaster';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HeaderProvider } from './providers/HeaderProvider';

const AuthContext = createContext({});

// const AuthProvider = ({ children, browserStorage }) => {
// 	const {
// 		authenticationSuccessToast,
// 		authenticationErrorToast,
// 		registrationErrorToast,
// 	} = useAuthToast();
// 	const router = useRouter();

// 	const registration = useMutation({
// 		mutationFn: (body: AuthBody) => authApiService.postRegister(body),
// 		onSuccess: (_, body) => {
// 			authentication.mutate(body);
// 		},
// 		onError: () => {
// 			registrationErrorToast();
// 		},
// 	});

// 	const authentication = useMutation({
// 		mutationFn: (body: AuthBody) => authApiService.postLogIn(body),
// 		onSuccess: data => {
// 			browserStorage.set(cookieTokenName, data.access_token, {
// 				expires: cookieExpirationTime,
// 			});
// 			authenticationSuccessToast();
// 			router.push(PagesRoutes.HOME);
// 		},
// 		onError: () => {
// 			authenticationErrorToast();
// 		},
// 	});

// 	const isLoading = registration.isPending || authentication.isPending;
// 	const isSuccessRegistration = registration.isSuccess;
// 	const isSuccessAuthentication = authentication.isSuccess;
// 	const register = (body: AuthBody) => registration.mutate(body);
// 	const toAuthenticate = (body: AuthBody) => authentication.mutate(body);

// 	return {
// 		isLoading,
// 		isSuccessRegistration,
// 		isSuccessAuthentication,
// 		register,
// 		toAuthenticate,
// 	};
// 	return <AuthContext.Provider value={{
// 		isLoading,
// 		isSuccessRegistration,
// 		isSuccessAuthentication,
// 		register,
// 		toAuthenticate,
// 	}}>
// 		{children}
// 	</AuthContext.Provider>
// }

export const App = ({ children }: { children: React.ReactNode }) => {
	const { basketManager } = useGetBasketManager();
	const queryClient = new QueryClient();

	useEffect(() => {
		basketManager.restoreBasketFromLocalStorage();
	}, []);

	return (
		<QueryClientProvider client={queryClient}>
			{/* <AuthProvider browserStorage={cookieStorageInstance}> */}
				<HeaderProvider>
					{children}
					<Toaster />
				</HeaderProvider>
			{/* </AuthProvider> */}
		</QueryClientProvider>
	);
};
