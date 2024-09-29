'use client';

import React from 'react';
import { useGetBasketManager } from '@/entities/Basket/hooks/useGetBasketManager';
import { BasketCard } from './BasketCard';

export const BasketListFeature = () => {
	const { basketManager } = useGetBasketManager();
	// Можно было бы сделать кастомный хук
	// const { products, isEmpty, getProductCountById } = useGetBasketList();

	if (!basketManager.basket.getProductsIds) {
		return 'Basket is empty';
	}

	return (
		<section>
			<div className='grid gap-2 grid-cols-1 justify-items-center'>
				{basketManager.basket.products.map(product => (
					<BasketCard
						key={product.id}
						title={product.title}
						description={product.description}
						countInBasket={basketManager.basket.getProductCountById(product.id)}
					/>
				))}
			</div>
		</section>
	);
};
