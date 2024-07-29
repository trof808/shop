'use client';

import { ProductsVirtualList } from './ProductsVirtualList';
import { useGetProducts } from './hooks/useGetProducts';

export const ProductsContainer = () => {
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
			<ProductsVirtualList
				products={products}
				addToBasketAction={addToBasketAction}
				removeFromBasketAction={removeFromBasketAction}
			/>

			{/* С точки зрения контекстов я бы сделал блок с totalPrice отдельной фичей (BasketButtonFeature), и уже внутри нее получать totalPrice */}
			<p>totalPice: {totalPrice}</p>
		</>
	);
};
