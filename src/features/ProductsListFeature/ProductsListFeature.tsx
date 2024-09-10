'use client';

import { BasketButtonFeature } from '../BasketButtonFeature/BasketButtonFeature';
import { basketStore } from '../BasketListFeature/stores/basketStore';
import { LinkToFiltersButton } from '../LinkToFiltersButton/LinkToFiltersButton';
import { ProductsVirtualList } from './ProductsVirtualList';
import { useGetProducts } from './hooks/useGetProducts';

export const ProductsListFeature = () => {
	const { products, status } = useGetProducts();
	const totalPrice = basketStore(state => state.getTotalPriceInBasket());

	if (status === 'loading') {
		return 'loading...';
	}

	return (
		<>
			<LinkToFiltersButton />

			<ProductsVirtualList products={products} />

			<BasketButtonFeature totalPrice={totalPrice} />
		</>
	);
};
