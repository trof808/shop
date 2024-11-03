'use client';

import React, { useEffect } from 'react';
import { useGetBasketManager } from '@/entities/Basket/hooks/useGetBasketManager';
import { Toaster } from '@/shared/components/ui/shadcn/toaster';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HeaderProvider } from './providers/HeaderProvider';
import { AuthProvider } from './providers/AuthProvider';
import { cookieStorageInstance } from '@/shared/entities/BrowserStorage/models/BrowserStorage';

export const App = ({ children }: { children: React.ReactNode }) => {
	const { basketManager } = useGetBasketManager();
	const queryClient = new QueryClient();

	useEffect(() => {
		basketManager.restoreBasketFromLocalStorage();
	}, []);

	return (
		<QueryClientProvider client={queryClient}>
			<AuthProvider browserStorage={cookieStorageInstance}>
				<HeaderProvider>
					{children}
					<Toaster />
				</HeaderProvider>
			</AuthProvider>
		</QueryClientProvider>
	);
};
