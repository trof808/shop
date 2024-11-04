'use client';

import { BasketManager } from '../models/BasketManager';
import { basketStore } from '../store/basketStore';
import { useToast } from '@/shared/hooks/useToast';
import { Basket } from '../models/Basket';
import { BASKET_KEY } from '../models/constants';
import { localStorageInstance } from '@/shared/entities/BrowserStorage/models/BrowserStorage';
import { useAuth } from '@/entities/Auth/hooks/useAuth';
import { useGetBasket } from './useGetBasket';
import { usePostBasket } from './usePostBasket';
import { useMemo } from 'react';
import { useDeleteBasket } from './useDeleteBasket';

export const useGetBasketManager = () => {
	// auth
	const { isAuthorized } = useAuth();

	// basket
	const basketState = basketStore().getBasketState();
	const updateBasketState = basketStore().updateBasketState;
	const { getBasket } = useGetBasket();
	const { saveCart } = usePostBasket();
	const { clearCart } = useDeleteBasket();

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
	const deleteBrowserStorage = () => localStorageInstance.delete(BASKET_KEY);

	const basketManager = useMemo(
		() =>
			new BasketManager({
				isAuthorized,
				updateStore: updateBasketState,
				notify: callToast,
				defaultBasketState: basketState,
				updateBrowserStorage,
				getBrowserStorage,
				deleteBrowserStorage,
				getBasketFromServer: getBasket,
				updateServerStorage: saveCart,
				deleteServerStorage: clearCart,
			}),
		[isAuthorized, basketState]
	);

	return {
		basketManager,
	};
};
