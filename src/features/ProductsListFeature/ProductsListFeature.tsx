'use client';

import { BasketButtonFeature } from '../BasketButtonFeature/BasketButtonFeature';
import { LinkToFiltersButton } from '../LinkToFiltersButton/LinkToFiltersButton';
import { ProductsVirtualList } from './ProductsVirtualList';
import { useGetProducts } from './hooks/useGetProducts';
import { useGetBasketManager } from '@/entities/Basket/hooks/useGetBasketManager';

// Много ответственности. Если я захочу написать интеграционные тест на фичу ProductsListFeature то мне придеться поработать еще и с LinkToFiltersButton и BasketButtonFeature
export const ProductsListFeature = () => {
	const { products, status, canAdd, canRemove, handleAddToBasket, handleRemoveFromBasket } = useGetProducts();
	const { basketManager } = useGetBasketManager();

	if (status === 'loading') {
		return 'loading...';
	}

	return (
		<>
			{/* Вот это больше относиться к главной странице, а не к фиче */}
			<LinkToFiltersButton />

			<ProductsVirtualList
				products={products}
				canAdd={canAdd}
				canRemove={canRemove}
				addToBasket={handleAddToBasket}
				removeFromBasket={handleRemoveFromBasket}
			/>

			{/* Вот это больше относиться к главной странице, а не к фиче */}
			{/* И каждый раз когда мне нужно эту фичу юзать надо где-то получать totalPrice и педевать */}
			<BasketButtonFeature totalPrice={basketManager.basket.totalPrice} />
		</>
	);
};
