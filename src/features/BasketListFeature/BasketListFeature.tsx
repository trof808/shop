'use client';

import React from 'react';
import { basketStore } from './stores/basketStore';
import { Layout } from './Layout';

export const BasketListFeature = () => {
	const productsInBasket = basketStore(state => state.productsInBasket);

	const getCountProductInBasket = basketStore(
		state => state.getCountProductInBasket
	);

	if (!productsInBasket.length) {
		return <Layout>Basket is empty</Layout>;
	}

	return (
		<section>
			<Layout>
				{productsInBasket.map(product => (
					<div
						key={product.id}
						className='w-64 mb-4 p-4 border border-gray-300 rounded-lg bg-white'
					>
						<h3 className='text-lg font-semibold'>{product.title}</h3>
						<p className='text-gray-700'>{product.description}</p>
						<p className='text-gray-500'>
							Count in basket: {getCountProductInBasket(product)}
						</p>
					</div>
				))}
			</Layout>
		</section>
	);
};
