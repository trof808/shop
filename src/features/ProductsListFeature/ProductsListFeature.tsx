'use client';

import { BasketButtonFeature } from '../BasketButtonFeature/BasketButtonFeature';
import { LinkToFiltersButton } from '../LinkToFiltersButton/LinkToFiltersButton';
import { ProductsVirtualList } from './ProductsVirtualList';
import { useGetProducts } from './hooks/useGetProducts';

export const ProductsListFeature = () => {
	const { products, status, totalPrice } = useGetProducts();

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
