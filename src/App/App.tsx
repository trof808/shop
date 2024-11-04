'use client';

import React from 'react';
import { Toaster } from '@/shared/components/ui/shadcn/toaster';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HeaderProvider } from './providers/HeaderProvider';
import { AuthProvider } from './providers/AuthProvider';
import { cookieStorageInstance } from '@/shared/entities/BrowserStorage/models/BrowserStorage';
import { DataProvider } from './providers/DataProvider';

export const App = ({ children }: { children: React.ReactNode }) => {
	const queryClient = new QueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			<AuthProvider browserStorage={cookieStorageInstance}>
				<DataProvider>
					<HeaderProvider>
						{children}
						<Toaster />
					</HeaderProvider>
				</DataProvider>
			</AuthProvider>
		</QueryClientProvider>
	);
};
