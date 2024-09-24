'use client';

import { ProductsVirtualList } from './ProductsVirtualList';
import { useGetProducts } from './hooks/useGetProducts';

export const ProductsListFeature = () => {
	const {
		products,
		status,
		canAdd,
		canRemove,
		handleAddToBasket,
		handleRemoveFromBasket,
	} = useGetProducts();

	if (status === 'loading') {
		return 'loading...';
	}

	return (
		<ProductsVirtualList
			products={products}
			canAdd={canAdd}
			canRemove={canRemove}
			addToBasket={handleAddToBasket}
			removeFromBasket={handleRemoveFromBasket}
		/>
	);
};
