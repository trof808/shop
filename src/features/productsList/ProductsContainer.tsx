'use client';

import { ProductsVirtualList } from './ProductsVirtualList';
import { useGetProducts } from './hooks/useGetProducts';

export const ProductsContainer = () => {
	const { products, isLoading } = useGetProducts();

	if (isLoading) {
		return 'loading...';
	}

	return <ProductsVirtualList products={products} />;
};
