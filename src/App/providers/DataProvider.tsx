'use client';

import React, { useEffect } from 'react';
import { useGetBasketManager } from '@/entities/Basket/hooks/useGetBasketManager';
import { useAuth } from '@/entities/Auth/hooks/useAuth';

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
	const { isAuthorized } = useAuth();
	const { basketManager } = useGetBasketManager();

	useEffect(() => {
		basketManager.restoreBasket();
	}, [isAuthorized]);

	return <>{children}</>;
};
