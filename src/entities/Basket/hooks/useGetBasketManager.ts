'use client';

import { BasketManager } from '../models/BasketManager';
import { basketStore } from '../store/basketStore';
import { useToast } from '@/shared/hooks/useToast';
import { LocalStorage } from '@/shared/entities/BrowserStorage/models/BrowserStorage';
import { Basket } from '../models/Basket';
import { BASKET_KEY } from '../models/constants';

export const useGetBasketManager = () => {
	// basket
	const basketState = basketStore().getBasketState();
	const updateBasketState = basketStore().updateBasketState;

	// toast
	const { toast } = useToast();
	const callToast = () =>
		toast({
			title: 'Warning!',
			description: 'Prices could have changed',
			variant: 'warning',
		});

	// localStorage
	const localStorageInstance = new LocalStorage();
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
