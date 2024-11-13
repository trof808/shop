'use client';
import React from 'react';
import { BasketCard } from './BasketCard';
import { useGetBasketFeature } from './hooks/useGetBasketFeature';

export const BasketListFeature = () => {
	const {
		isEmpty,
		productsInTheBasket,
		getProductQuantityInBasket,
		clearTheBasket,
	} = useGetBasketFeature();

	if (isEmpty) {
		return (
			<div className='text-center text-lg font-bold'>The basket is empty</div>
		);
	}

	return (
		<section>
			<div className='grid gap-2 grid-cols-1 justify-items-center'>
				{productsInTheBasket.map(product => (
					<BasketCard
						key={product.id}
						title={product.title}
						description={product.description}
						price={product.price.amount}
						countInBasket={getProductQuantityInBasket(product.id)}
					/>
				))}
			</div>

			<button
				className='flex bg-red-500 hover:bg-red-700 text-white font-bold mt-4 py-2 px-4 rounded mx-auto'
				onClick={clearTheBasket}
			>
				Clear the basket
			</button>
		</section>
	);
};
