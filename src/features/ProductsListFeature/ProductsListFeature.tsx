'use client';

import { ProductsVirtualList } from './ProductsVirtualList';
import { useGetMainPageProductsList } from './hooks/useGetMainPageProductsList';

// export const ProductsListFeature = ({ defaultData }) => {
export const ProductsListFeature = () => {
	const {
		products,
		status,
		canAdd,
		canRemove,
		handleAddToBasket,
		handleRemoveFromBasket,
		fetchNextPage,
		hasNextPage,
	// } = useGetMainPageProductsList({ defaultData });
	} = useGetMainPageProductsList();

	if (status === 'pending') {
		return 'loading...';
	}

	return (
		<ProductsVirtualList
			products={products}
			canAdd={canAdd}
			canRemove={canRemove}
			addToBasket={handleAddToBasket}
			removeFromBasket={handleRemoveFromBasket}
			fetchNextPage={fetchNextPage}
			hasNextPage={hasNextPage}
		/>
	);
};
