'use client';

import React, { useEffect } from 'react';
import { ButtonBackProvider } from './providers/ButtonBackProvider';
import { useGetBasketManager } from '@/entities/Basket/hooks/useGetBasketManager';

export const App = ({ children }: { children: React.ReactNode }) => {
	const { basketManager } = useGetBasketManager();

	useEffect(() => {
		basketManager.restoreBasketFromLocalStorage();
	}, []);

	return <ButtonBackProvider>{children}</ButtonBackProvider>;
};
