import { useGetBasketManager } from '@/entities/Basket/hooks/useGetBasketManager';
import { ProductId } from '@/entities/Products/types';

export const useGetBasketFeature = () => {
	const { basketManager } = useGetBasketManager();

	const isEmpty = !basketManager.basket.getProductsIds.length;
	const productsInTheBasket = basketManager.basket.products;
	const getProductQuantityInBasket = (productId: ProductId) =>
		basketManager.basket.getProductCountById(productId);
	const clearTheBasket = () => basketManager.handleClearBasket();

	return {
		isEmpty,
		productsInTheBasket,
		getProductQuantityInBasket,
		clearTheBasket,
	};
};
