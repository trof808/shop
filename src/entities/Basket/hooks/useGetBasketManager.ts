'use client';

import { BasketManager } from '../models/BasketManager';
import { basketStore } from '../store/basketStore';
import { useToast } from '@/shared/hooks/useToast';
import { Basket } from '../models/Basket';
import { localStorageInstance } from '@/shared/entities/BrowserStorage/models/BrowserStorage';
import { useAuth } from '@/entities/Auth/hooks/useAuth';
import { useMemo } from 'react';
import { useGetBasketService } from './useBasketService';

export const useGetBasketManager = () => {
	// auth
	const { isAuthorized } = useAuth();

	// basket
	const basketState = basketStore().getBasketState();
	const updateBasketState = basketStore().updateBasketState;
	const basket = new Basket(basketState);
	const { getBasket, saveBasket, clearBasket } = useGetBasketService();

	// toast
	const { toast } = useToast();
	const callToast = (message: string) =>
		toast({
			title: 'Warning!',
			description: message,
			variant: 'warning',
		});

	const basketManager = useMemo(
		() =>
			new BasketManager({
				isAuthorized,
				basket,
				updateStore: updateBasketState,
				notify: callToast,
				browserStorage: localStorageInstance,
				getBasketFromServer: getBasket,
				updateServerStorage: saveBasket,
				deleteServerStorage: clearBasket,
			}),
		[isAuthorized, basketState]
	);

	return {
		basketManager,
	};
};
