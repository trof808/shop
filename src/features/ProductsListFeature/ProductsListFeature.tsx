'use client';

import { BasketButtonFeature } from '../BasketButtonFeature/BasketButtonFeature';
import { LinkToFiltersButton } from '../LinkToFiltersButton/LinkToFiltersButton';
import { ProductsVirtualList } from './ProductsVirtualList';
import { useGetProducts } from './hooks/useGetProducts';

export const ProductsListFeature = () => {
	const {
		products,
		isLoading,
		totalPrice,
		addToBasketAction,
		removeFromBasketAction,
	} = useGetProducts();

	if (isLoading) {
		return 'loading...';
	}

	return (
		<>
			<LinkToFiltersButton />

			<ProductsVirtualList
				products={products}
				addToBasketAction={addToBasketAction}
				removeFromBasketAction={removeFromBasketAction}
			/>

			<BasketButtonFeature totalPrice={totalPrice} />
		</>
	);
};
