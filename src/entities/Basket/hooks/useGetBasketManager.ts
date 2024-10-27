'use client';

import { BasketManager } from '../models/BasketManager';
import { basketStore } from '../store/basketStore';
import { useToast } from '@/shared/hooks/useToast';
import { Basket } from '../models/Basket';
import { BASKET_KEY } from '../models/constants';
import { localStorageInstance } from '@/entities/BrowserStorage/models/BrowserStorage';

export const useGetBasketManager = () => {
	// basket
	const basketState = basketStore().getBasketState();
	const updateBasketState = basketStore().updateBasketState;

	// toast
	const { toast } = useToast();
	const callToast = (message: string) =>
		toast({
			title: 'Warning!',
			description: message,
			variant: 'warning',
		});

	// localStorage
	const updateBrowserStorage = (basket: Basket) =>
		localStorageInstance.set(BASKET_KEY, JSON.stringify(basket));
	const getBrowserStorage = () => localStorageInstance.get(BASKET_KEY);

	const basketManager = new BasketManager(
		updateBasketState,
		callToast,
		basketState,
		updateBrowserStorage,
		getBrowserStorage
	);

	return {
		basketManager,
	};
};
